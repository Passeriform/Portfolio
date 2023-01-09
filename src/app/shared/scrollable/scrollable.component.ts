import type { AfterContentInit, AfterViewInit } from "@angular/core";
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList } from "@angular/core";

import { EMPTY, NEVER, Observable, fromEvent, identity, merge } from "rxjs";
import { filter, map, startWith, switchMap, throttleTime } from "rxjs/operators";

import { Orientation, Position } from "@shared/models/cardinals.interface";
import { PageRevealService } from "@core/services/page-reveal.service";
import { fromMotionEvent, selfTargetFilter } from "@utility/events";

import { Constants } from "./scrollable.config";
import { transitionEndEvents, transitionStartEvents } from "./scrollable.interface";

// TODO: Remove lag from scroll/swipe.

// TODO: Modify member utility function to exported free functions and move out to separate utility file.

// TODO: Add keyboard controls.

// TODO: Move to separate scrollable module.

@Component({
	selector: "app-scrollable",
	styleUrls: [ "./scrollable.component.scss" ],
	templateUrl: "./scrollable.component.html",
})
export class ScrollableComponent implements AfterContentInit, AfterViewInit {
	private maxScrollableSize: number;
	private readonly threshold: number = Constants.THRESHOLD;
	public pageIndex: number = Constants.INITIAL_PAGE_INDEX;
	public pageNavTravelFactor: number = 0;

	// TODO: Throw error if nestedScroll is enabled without fullpage
	@Input() private readonly nestedScroll: boolean = false;
	@Input() private readonly sensitivity: number = Constants.SENSITIVITY_DEFAULT;
	@Input() private readonly throttle: number = Constants.THROTTLE_DEFAULT;
	@Input() private readonly smoothScroll: boolean = Constants.SMOOTH_SCROLL_DEFAULT;
	@Input() private readonly allowStartReveal: boolean;
	@Input() private readonly allowEndReveal: boolean;
	@Input() private startRevealElement: HTMLElement;
	@Input() private endRevealElement: HTMLElement;
	@Input() public readonly orientation: Orientation = Constants.ORIENTATION_DEFAULT;
	@Input() public readonly showPageNav: boolean = false;
	@Input() public delta: number = Constants.DELTA_DEFAULT;
	@Input() public endReveal: boolean = false;
	@Input() public startReveal: boolean = false;
	@Input() public readonly pageNavPosition: Position = this.orientation === Orientation.HORIZONTAL ? Position.BOTTOM : Position.LEFT;
	@Input() public readonly fullpage: boolean;
	@Input() public readonly pageResetTrigger$?: Observable<void>;

	@Output() private readonly pageChangeEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() private readonly pagesChildrenChangeEvent: EventEmitter<QueryList<ElementRef>> = new EventEmitter<QueryList<ElementRef>>();

	@ContentChildren("page", { read: ElementRef }) public readonly items: QueryList<ElementRef<HTMLElement>>;

	// TODO: Make page-nav an exposed directive child for scrollable so that caller can control its props easily

	@HostListener("window:resize")
	public onResize(): void {
		this.computeMaxScrollSize();
		this.computeDeltaIfFullpage();
	}

	@HostBinding("style.width")
	public get width(): string {
		return this.orientation === Orientation.HORIZONTAL && this.fullpage ? "100vw" : "100%";
	}

	@HostBinding("style.height")
	public get height(): string {
		return this.orientation === Orientation.VERTICAL && this.fullpage ? "var(--apparent-viewport-height, 100vh)" : "100%";
	}

	@HostBinding("style.margin-top")
	public get top(): string {
		if (this.orientation === Orientation.HORIZONTAL || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		const windowHeight: number = document.documentElement.clientHeight;

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientHeight, windowHeight)}px`
			: `-${Math.min(this.endRevealElement.clientHeight, windowHeight)}px`;
	}

	@HostBinding("style.margin-left")
	public get left(): string {
		if (this.orientation === Orientation.VERTICAL || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		const windowWidth: number = document.documentElement.clientWidth;

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientWidth, windowWidth)}px`
			: `-${Math.min(this.endRevealElement.clientWidth, windowWidth)}px`;
	}

	constructor(
			private readonly hostElement: ElementRef,
			private readonly pageRevealService: PageRevealService,
	) { }

	// TODO: Use boolean enum instead.
	private handleReveals(pagesToShift: number): boolean {
		let transitioned = false;
		if (this.allowEndReveal) {
			if (pagesToShift > 0 && this.pageIndex === (this.maxScrollableSize / this.delta)) {
				const expectedScrollSize: number = Math.ceil(this.delta * (
					this.pageIndex + (pagesToShift * this.sensitivity)
				));

				if (expectedScrollSize > this.maxScrollableSize) {
					transitioned = !this.endReveal;
					this.endReveal = true;
				}
			} else {
				transitioned = this.endReveal;
				this.endReveal = false;
			}
		} else if (this.allowStartReveal) {
			if (pagesToShift < 0 && this.pageIndex === 0) {
				transitioned = !this.startReveal;
				this.startReveal = true;
			}

			if (this.startReveal) {
				transitioned = this.startReveal;
				this.startReveal = false;
			}
		}

		return transitioned;
	}

	private pageShift(pagesToShift: number): void {
		if (this.handleReveals(pagesToShift)) {
			return;
		}

		if (pagesToShift < 0) {
			this.pageShiftUp(Math.abs(pagesToShift));
		} else if (pagesToShift > 0) {
			this.pageShiftDown(Math.abs(pagesToShift));
		}
	}

	private pageShiftUp(pagesToShift: number): void {
		this.pageIndex = Math.max(this.pageIndex - Math.floor(pagesToShift * this.sensitivity), 0);
		this.pageChangeEvent.emit(this.pageIndex);
	}

	private pageShiftDown(pagesToShift: number): void {
		const maxScrollablePages = this.maxScrollableSize / this.delta;
		this.pageIndex = Math.min(this.pageIndex + Math.floor(pagesToShift * this.sensitivity), maxScrollablePages);
		this.pageChangeEvent.emit(this.pageIndex);
	}

	private pageReset(): void {
		this.pageIndex = 0;
		this.pageChangeEvent.emit(this.pageIndex);
	}

	private computeMaxScrollSize(): void {
		const childSizes: number[] = this.items.toArray().map(
			(elementReference: ElementRef<HTMLElement>) => this.getViewSize(elementReference.nativeElement),
		);
		this.maxScrollableSize = childSizes.slice(0, -1).reduce((accumulator: number, current: number) => accumulator + current, 0);
	}

	private computeDeltaIfFullpage(): void {
		if (this.fullpage && this.items.length) {
			this.delta = this.getViewSize(this.items.first.nativeElement);
		}
	}

	private computeTravelFactor() {
		this.pageNavTravelFactor = this.delta / ((this.items.length - 1) * (this.items.get(0)?.nativeElement.clientWidth ?? 0));
	}

	private readonly getViewSize = (element: HTMLElement): number => element[
		`${
			this.nestedScroll ? "client" : "offset"
		}${
			this.orientation === Orientation.HORIZONTAL ? "Width" : "Height"
		}`
	]
		+ Number.parseFloat(getComputedStyle(element).getPropertyValue(
			this.orientation === Orientation.HORIZONTAL ? "margin-left" : "margin-top",
		))
		+ Number.parseFloat(getComputedStyle(element).getPropertyValue(
			this.orientation === Orientation.HORIZONTAL ? "margin-right" : "margin-bottom",
		));

	private readonly nestedScrollFilter = (shiftAmt: number): boolean => {
		if (!this.nestedScroll) {
			return true;
		}

		if (this.startReveal || this.endReveal) {
			return true;
		}

		const pageElement: HTMLElement | undefined = this.items.toArray()[this.pageIndex]?.nativeElement;

		if (!pageElement) {
			return false;
		}

		const {
			[`client${this.orientation === Orientation.HORIZONTAL ? "Width" : "Height"}` as const]: elementSize,
			[`scroll${this.orientation === Orientation.HORIZONTAL ? "Width" : "Height"}` as const]: scrollableSize,
			[`scroll${this.orientation === Orientation.HORIZONTAL ? "Left" : "Top"}` as const]: scrolled,
		} = pageElement;

		if (shiftAmt < 0) {
			// Scrolling up
			return scrolled === 0;
		}

		// Scrolling down
		return (scrollableSize - elementSize) === scrolled;
	};

	private subscribeShiftStream$() {
		const shiftStream$ = merge(
			fromMotionEvent(this.hostElement.nativeElement, this.orientation).pipe(
				filter((difference: number) => Math.abs(difference) >= Math.abs(this.threshold)),
				filter(this.nestedScrollFilter),
				this.smoothScroll ? identity : throttleTime(this.throttle),
			),
			this.allowStartReveal && this.startRevealElement.firstChild
				? fromMotionEvent(this.startRevealElement.firstChild as HTMLElement, this.orientation).pipe(
					filter(() => (this.endRevealElement.firstChild as HTMLElement)[this.orientation === Orientation.HORIZONTAL ? "scrollLeft" : "scrollTop"] === this.getViewSize(this.endRevealElement.firstChild as HTMLElement)),
					filter((difference: number) => Math.abs(difference) >= Math.abs(this.threshold)),
					filter(this.nestedScrollFilter),
					this.smoothScroll ? identity : throttleTime(this.throttle),
				)
				: NEVER,
			this.allowEndReveal && this.endRevealElement.firstChild
				? fromMotionEvent(this.endRevealElement.firstChild as HTMLElement, this.orientation).pipe(
					filter(() => (this.endRevealElement.firstChild as HTMLElement)[this.orientation === Orientation.HORIZONTAL ? "scrollLeft" : "scrollTop"] === 0),
					filter((difference: number) => Math.abs(difference) >= Math.abs(this.threshold)),
					filter(this.nestedScrollFilter),
					this.smoothScroll ? identity : throttleTime(this.throttle),
				)
				: NEVER,
		);

		const transitionStartStreams$ = transitionStartEvents.map(
			(eventName) => fromEvent<TransitionEvent>(this.hostElement.nativeElement as HTMLElement, eventName).pipe(
				selfTargetFilter(this.hostElement.nativeElement as HTMLElement),
			),
		);

		const transitionEndStreams$ = transitionEndEvents.map(
			(eventName) => fromEvent<TransitionEvent>(this.hostElement.nativeElement as EventTarget, eventName).pipe(
				selfTargetFilter(this.hostElement.nativeElement as HTMLElement),
			),
		);

		const scrollStreamToggle$ = merge(
			merge(...transitionStartStreams$).pipe(map(() => false)),
			merge(...transitionEndStreams$).pipe(map(() => true)),
		).pipe(startWith(true));

		scrollStreamToggle$.pipe(
			switchMap(
				(allowEvents) => allowEvents
					? shiftStream$
					: EMPTY,
			),
		).subscribe(
			(shiftAmt: number) => {
				this.pageShift(shiftAmt);
			},
		);
	}

	ngAfterContentInit() {
		this.pagesChildrenChangeEvent.emit(this.items);
		this.items.changes.subscribe(() => {
			this.computeMaxScrollSize();
			this.computeDeltaIfFullpage();
			this.computeTravelFactor();

			this.pageIndex = Math.min(this.pageIndex, this.maxScrollableSize / this.delta);
		});
	}

	ngAfterViewInit() {
		this.computeMaxScrollSize();
		this.computeDeltaIfFullpage();
		this.computeTravelFactor();

		this.pageResetTrigger$?.subscribe(() => {
			this.pageReset();
		});

		this.pageRevealService.startRevealElement$.subscribe((startRevealElement: HTMLElement) => {
			this.startRevealElement = startRevealElement;
		});

		this.pageRevealService.endRevealElement$.subscribe((endRevealElement: HTMLElement) => {
			this.endRevealElement = endRevealElement;
		});

		this.subscribeShiftStream$();
	}

	public get scrollableTransform(): string {
		if (this.orientation === Orientation.HORIZONTAL) {
			return `translateX(${-this.delta * this.pageIndex}px)`;
		}

		return `translateY(${-this.delta * this.pageIndex}px)`;
	}

	// TODO: Make PageNav compatible when fullpage is false. Use delta and expected scroll to index.

	public setActivePageIndex(index: number): void {
		this.endReveal = this.startReveal = false;
		this.pageIndex = index;
		this.pageChangeEvent.emit(this.pageIndex);
	}
}
