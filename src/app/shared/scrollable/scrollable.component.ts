// TODO: Remove lag from scroll/swipe.

import type { AfterContentInit, AfterViewInit, OnInit, QueryList } from "@angular/core";
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output } from "@angular/core";

import { NEVER, fromEvent, identity, merge } from "rxjs";
import type { Observable } from "rxjs";
import { filter, map, tap, mergeMap, raceWith, take, takeUntil, throttleTime } from "rxjs/operators";

import { FooterService } from "@app/footer/footer.service";

import { Constants } from "./scrollable.config";

@Component({
	selector: "app-scrollable",
	styleUrls: [ "./scrollable.component.scss" ],
	templateUrl: "./scrollable.component.html",
})
export class ScrollableComponent implements OnInit, AfterContentInit, AfterViewInit {
	// TODO: Add boolean flag that gets set in nested scroll detection filter. Once the nested scroll filter is enabled, throttle the scroll to create sticky feel

	// TODO: Add smoothen input to remove scrollcancel

	// TODO: Throw error if nestedScroll is enabled without fullpage

	@Input() private readonly nestedScroll = false;
	@Input() private readonly delta = Constants.DELTA_DEFAULT;
	@Input() private readonly overshoot = Constants.OVERSHOOT_DEFAULT;
	@Input() private readonly throttle = Constants.THROTTLE_DEFAULT;
	@Input() private readonly horizontal = Constants.VERTICAL;
	@Input() private endReveal = false;
	@Input() private startReveal = false;
	@Input() private readonly fullpage: boolean;
	@Input() private readonly allowStartReveal: boolean;
	@Input() private readonly allowEndReveal: boolean;
	@Input() private startRevealElement: HTMLElement;
	@Input() private endRevealElement: HTMLElement;

	@Output() private readonly pageChangeEvent: EventEmitter<number> = new EventEmitter<number>();
	@Output() private readonly pagesChildrenChangeEvent: EventEmitter<QueryList<ElementRef>> = new EventEmitter<QueryList<ElementRef>>();

	@ContentChildren("page", { read: ElementRef }) private readonly items: QueryList<ElementRef>;

	private pageIndex: number = Constants.INITIAL_PAGE_INDEX;
	private readonly scrollTolerance: number = Constants.SCROLL_TOLERANCE;	// Scroll sensitivity
	private readonly touchTolerance: number = Constants.TOUCH_TOLERANCE;		// Swipe distance in pixels
	private readonly transitionStarts: readonly string[] = [
		"transitionstart",
		// "oTransitionStart",
		// "webkitTransitionStart",
	];

	private readonly transitionEnds: readonly string[] = [
		"transitionend",
		// "oTransitionEnd",
		// "webkitTransitionEnd",
	];

	private readonly transitionStartStreams = this.transitionStarts.map(
		(eventName: string) => fromEvent(this.hostElement.nativeElement as EventTarget, eventName).pipe(
			// TODO: Configure this properly to support nested scrolling

			filter(
				(event: Event) => event.target === this.hostElement.nativeElement,
			),
		),
	);

	private readonly transitionEndStreams = this.transitionEnds.map(
		(eventName: string) => fromEvent(this.hostElement.nativeElement as EventTarget, eventName).pipe(
			// TODO: Configure this properly to support nested scrolling

			filter(
				(event: Event) => event.target === this.hostElement.nativeElement,
			),
		),
	);

	private scrollStream$: Observable<number>;
	private swipeStream$: Observable<number>;

	constructor(
			private readonly hostElement: ElementRef,
			private readonly footerService: FooterService,
	) { }

	@HostBinding("style.-webkit-transform")
	@HostBinding("style.-ms-transform")
	@HostBinding("style.transform") public get transform(): string {
		if (this.horizontal) {
			return `translateX(${-this.delta * this.pageIndex}vw)`;
		}

		return `translateY(${-this.delta * this.pageIndex}vh)`;
	}

	@HostBinding("style.top") public get top(): string {
		if (this.horizontal || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientHeight, document.documentElement.clientHeight)}px`
			: `-${Math.min(this.endRevealElement.clientHeight, document.documentElement.clientHeight)}px`;
	}

	@HostBinding("style.left") public get left(): string {
		if (!this.horizontal || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientWidth, document.documentElement.clientWidth)}px`
			: `-${Math.min(this.endRevealElement.clientWidth, document.documentElement.clientWidth)}px`;
	}

	private handleStartReveal(): void {
		if (this.allowStartReveal) {
			this.startReveal = true;
		}
	}

	private handleEndReveal(): void {
		if (this.allowEndReveal) {
			this.endReveal = true;
		}
	}

	private resetStartReveal(): void {
		if (this.allowStartReveal) {
			this.startReveal = false;
		}
	}

	private resetEndReveal(): void {
		if (this.allowEndReveal) {
			this.endReveal = false;
		}
	}

	private pageShift(shiftAmt: number): void {
		if (shiftAmt < 0) {
			this.pageShiftUp(shiftAmt);
		} else if (shiftAmt > 0) {
			this.pageShiftDown(shiftAmt);
		}
	}

	// TODO: Justify pulling the delta value
	private pageShiftUp(delta: number): void {
		if (this.endReveal) {
			this.resetEndReveal();

			return;
		}

		if (this.pageIndex === 0) {
			this.handleStartReveal();
		}

		this.pageIndex = Math.max(this.pageIndex - 1, 0);

		this.pageChangeEvent.emit(this.pageIndex);
	}

	// TODO: Justify pulling the delta value
	private pageShiftDown(delta: number): void {
		if (this.startReveal) {
			this.resetStartReveal();

			return;
		}

		const childElements: HTMLElement[] = this.items.toArray().map(
			(elementReference: ElementRef<HTMLElement>) => elementReference.nativeElement,
		);
		if (childElements.length === 0) {
			return;
		}

		// NOTE: Assumes all elements are equal and thus picks first and computes styles

		// NOTE: Major performance hit. For specific cases, consider providing an option for manual overshoot specification

		const itemWidth: number = childElements[0].clientWidth
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-left"))
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-right"));
		const itemHeight: number = childElements[0].clientHeight
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-top"))
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-bottom"));
		const scrollableWidth: number = (childElements.length - 1) * itemWidth;
		const scrollableHeight: number = (childElements.length - 1) * itemHeight;

		const vw: number = document.documentElement.clientWidth;
		const vh: number = document.documentElement.clientHeight;

		if (this.horizontal) {
			const expectedScrollWidth: number = Math.ceil(this.delta * (vw / 100) * (this.pageIndex + 1));
			if (expectedScrollWidth > scrollableWidth) {
				this.handleEndReveal();

				return;
			}
		} else {
			const expectedScrollHeight: number = Math.ceil(this.delta * (vh / 100) * (this.pageIndex + 1));
			if (expectedScrollHeight > scrollableHeight) {
				this.handleEndReveal();

				return;
			}
		}

		this.pageIndex++;

		this.pageChangeEvent.emit(this.pageIndex);
	}

	private pageReset(): void {
		this.pageIndex = 0;
		this.pageChangeEvent.emit(this.pageIndex);
	}

	private readonly getRevealElementEvent = (element: HTMLElement, listener: string): Observable<Event> => fromEvent(element, listener)
		.pipe(
			filter(() => element?.[this.horizontal ? "scrollLeft" : "scrollTop"] === 0),
		);

	private readonly getStartRevealElementEvent = (listener: string): Observable<Event> => this.getRevealElementEvent(
		// TODO: Change to detect the first element in DOM tree that is scrollable.
		this.startRevealElement.firstChild as HTMLElement,
		listener,
	);

	private readonly getEndRevealElementEvent = (listener: string): Observable<Event> => this.getRevealElementEvent(
		// TODO: Change to detect the first element in DOM tree that is scrollable.
		this.endRevealElement.firstChild as HTMLElement,
		listener,
	);

	private readonly nestedScrollFilter = (shiftAmt: number): boolean => {
		if (!this.nestedScroll) {
			return true;
		}

		if (this.startReveal || this.endReveal) {
			return true;
		}

		const pageElement: HTMLElement = this.items.toArray()?.[this.pageIndex]?.nativeElement;

		if (!pageElement) {
			return false;
		}

		const {
			clientHeight,
			clientWidth,
			scrollHeight,
			scrollLeft,
			scrollTop,
			scrollWidth,
		}: {
			readonly clientHeight: number;
			readonly clientWidth: number;
			readonly scrollHeight: number;
			readonly scrollLeft: number;
			readonly scrollTop: number;
			readonly scrollWidth: number;
		} = pageElement;

		let elementSize: number;
		let scrollableSize: number;
		let scrolled: number;

		if (this.horizontal) {
			elementSize = clientWidth;
			scrollableSize = scrollWidth;
			scrolled = scrollLeft;
		} else {
			elementSize = clientHeight;
			scrollableSize = scrollHeight;
			scrolled = scrollTop;
		}

		if (shiftAmt < 0) {
			// Scrolling up
			return scrolled === 0;
		}

		// Scrolling down
		return (scrollableSize - elementSize) === scrolled;
	};

	private readonly applyScrollOptimization = (scrollStream$: Observable<MouseWheelEvent>): Observable<number> => scrollStream$
		.pipe(
			map((nextEvent: MouseWheelEvent) => this.horizontal ? nextEvent.deltaX : nextEvent.deltaY),
			filter((difference) => Math.abs(difference) >= Math.abs(this.scrollTolerance)),
			filter(this.nestedScrollFilter),
			this.throttle ? throttleTime(this.throttle) : identity,
		);

	private readonly applySwipeOptimization = (scrollStream$: Observable<TouchEvent>, element: HTMLElement): Observable<number> => scrollStream$
		.pipe(
			map(
				// No need to check for empty event as its captured by fromEvent
				(event: TouchEvent) => this.horizontal ? event.touches[0].pageX : event.touches[0].pageY,
			),
			mergeMap(
				(init: number) => fromEvent(element, "touchmove").pipe(
					raceWith(
						fromEvent(element, "touchend").pipe(
							takeUntil(fromEvent(element, "touchstart")),
						),
					),
					map(
						(event: TouchEvent) => this.horizontal
							? event.touches[0]?.pageX ?? 0
							: event.touches[0]?.pageY ?? 0,
					),
					map((swiped) => init - swiped),
					take(1),
					filter((difference) => Math.abs(difference) >= Math.abs(this.touchTolerance)),
					map((scaled) => scaled / 5)
				),
			),
			(this.throttle !== 0) ? throttleTime(this.throttle) : identity,
		);

	ngOnInit() {
		// ngOnInit
	}

	ngAfterContentInit() {
		this.pagesChildrenChangeEvent.emit(this.items);
	}

	ngAfterViewInit() {
		this.footerService.footerElement$.subscribe((footerElement: HTMLElement) => {
			this.endRevealElement = footerElement!;
		});

		this.scrollStream$ = merge(
			this.applyScrollOptimization(
				fromEvent(this.hostElement.nativeElement, "wheel"),
			),
			this.allowStartReveal
				? this.applyScrollOptimization(
					this.getStartRevealElementEvent("wheel") as Observable<MouseWheelEvent>,
				)
				: NEVER,
			this.allowEndReveal
				? this.applyScrollOptimization(
					this.getEndRevealElementEvent("wheel") as Observable<MouseWheelEvent>,
				)
				: NEVER,
		);

		this.swipeStream$ = merge(
			this.applySwipeOptimization(
				fromEvent(this.hostElement.nativeElement, "touchmove"),
				this.hostElement.nativeElement,
			),
			this.allowStartReveal
				? this.applySwipeOptimization(
					this.getStartRevealElementEvent("touchmove") as Observable<TouchEvent>,
					this.startRevealElement,
				)
				: NEVER,
			this.allowEndReveal
				? this.applySwipeOptimization(
					this.getEndRevealElementEvent("touchmove") as Observable<TouchEvent>,
					this.endRevealElement,
				)
				: NEVER,
		);

		this.scrollStream$.subscribe((shiftAmt: number) => {
			this.pageShift(shiftAmt);
		});
		this.swipeStream$.subscribe((shiftAmt: number) => {
			this.pageShift(shiftAmt);
		});

		// TODO: Check if transition streams are required anymore

		merge(...this.transitionStartStreams).subscribe();
		merge(...this.transitionEndStreams).subscribe();
	}
}
