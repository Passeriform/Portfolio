// TODO: Remove lag from scroll/swipe.

import type { AfterContentInit, AfterViewInit, OnInit, QueryList } from "@angular/core";
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

import { NEVER, concat, fromEvent, identity, merge } from "rxjs";
import type { Observable } from "rxjs";
import { bufferCount, repeat, filter, map, take, takeUntil, throttleTime } from "rxjs/operators";

import { PageEndRevealService } from "@core/services/page-end-reveal.service";

import { Constants } from "./scrollable.config";

@Component({
	selector: "app-scrollable",
	styleUrls: [ "./scrollable.component.scss" ],
	templateUrl: "./scrollable.component.html",
})
export class ScrollableComponent implements OnInit, AfterContentInit, AfterViewInit {
	// TODO: Throw error if nestedScroll is enabled without fullpage

	@Input() private readonly nestedScroll = false;
	@Input() private readonly sensitivity = Constants.SENSITIVITY_DEFAULT;
	@Input() private readonly throttle = Constants.THROTTLE_DEFAULT;
	@Input() private readonly smoothScroll = Constants.SMOOTH_SCROLL_DEFAULT;
	@Input() private readonly horizontal = Constants.VERTICAL;
	@Input() private delta = Constants.DELTA_DEFAULT;
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
	private maxScrollableSize: number;

	// Scroll Parameters
	private readonly scrollThreshold: number = Constants.SCROLL_THRESHOLD;
	private readonly scrollNormalizationFactor: number = Constants.SCROLL_NORMALIZATION_FACTOR;

	// Swipe distance in pixels
	private readonly swipeThreshold: number = Constants.SWIPE_THRESHOLD;
	private readonly swipeNormalizationFactor: number = Constants.SWIPE_NORMALIZATION_FACTOR;

	private readonly transitionStartEvents: readonly string[] = [
		"transitionstart",
		// "oTransitionStart",
		// "webkitTransitionStart",
	];

	private readonly transitionEndEvents: readonly string[] = [
		"transitionend",
		// "oTransitionEnd",
		// "webkitTransitionEnd",
	];

	private readonly transitionStartStream$ = this.transitionStartEvents.map(
		(eventName: string) => merge(
			fromEvent(this.hostElement.nativeElement as EventTarget, eventName),
			this.allowStartReveal
				? this.getStartRevealElementEvent(eventName) as Observable<TransitionEvent>
				: NEVER,
			this.allowEndReveal
				? this.getEndRevealElementEvent(eventName) as Observable<TransitionEvent>
				: NEVER,
		).pipe(
			filter(
				(event: Event) => event.target === this.hostElement.nativeElement,
			),
		),
	);

	private readonly transitionEndStream$ = this.transitionEndEvents.map(
		(eventName: string) => fromEvent(this.hostElement.nativeElement as EventTarget, eventName).pipe(
			filter(
				(event: Event) => event.target === this.hostElement.nativeElement,
			),
		),
	);

	private scrollStream$: Observable<number>;
	private swipeStream$: Observable<number>;

	constructor(
			private readonly hostElement: ElementRef,
			private readonly pageEndRevealService: PageEndRevealService,
	) { }

	@HostListener("window:resize", ["$event"])
	public onResize(event): void {
	  this.calculateMaxScrollableSize();
	}

	@HostBinding("style.-webkit-transform")
	@HostBinding("style.-ms-transform")
	@HostBinding("style.transform")
	public get transform(): string {
		if (this.horizontal) {
			return `translateX(${-this.delta * this.pageIndex}px)`;
		}

		return `translateY(${-this.delta * this.pageIndex}px)`;
	}

	@HostBinding("style.top")
	public get top(): string {
		if (this.horizontal || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientHeight, document.documentElement.clientHeight)}px`
			: `-${Math.min(this.endRevealElement.clientHeight, document.documentElement.clientHeight)}px`;
	}

	@HostBinding("style.left")
	public get left(): string {
		if (!this.horizontal || !(this.startReveal || this.endReveal)) {
			return "0px";
		}

		return this.startReveal
			? `${Math.min(this.startRevealElement.clientWidth, document.documentElement.clientWidth)}px`
			: `-${Math.min(this.endRevealElement.clientWidth, document.documentElement.clientWidth)}px`;
	}

	// TODO: Use boolean enum instead.
	private handleReveals(pagesToShift: number): boolean {
		let transitioned = false
		if (this.allowEndReveal) {
			if (pagesToShift > 0 && this.pageIndex === (this.maxScrollableSize / this.delta)) {
				const expectedScrollSize: number = Math.ceil(this.delta * (
					this.pageIndex + (pagesToShift * this.sensitivity)
				));

				if (expectedScrollSize > this.maxScrollableSize) {
					transitioned = this.endReveal === false;
					this.endReveal = true;
				}
			} else {
				transitioned = this.endReveal === true;
				this.endReveal = false;
			}
		} else if (this.allowStartReveal) {
			if (pagesToShift < 0 && this.pageIndex === 0) {
				transitioned = this.startReveal === false;
				this.startReveal = true;
			}

			if (this.startReveal) {
				transitioned = this.startReveal === true;
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

	private calculateMaxScrollableSize(): void {
		const childSizes: number[] = this.items.toArray().map(
			(elementReference: ElementRef<HTMLElement>) => this.getViewSize(elementReference.nativeElement)
		);
		this.maxScrollableSize = childSizes.slice(0, -1).reduce((acc: number, current: number) => acc + current, 0);
	}

	private readonly getStartRevealElementEvent = (listener: string): Observable<Event> => {
		const eventCapturer = this.startRevealElement.firstChild as HTMLElement;
		return fromEvent(eventCapturer, listener)
		.pipe(
			filter(() => eventCapturer[this.horizontal ? "scrollLeft" : "scrollTop"] === this.getViewSize(eventCapturer)),
		)
	}

	private readonly getEndRevealElementEvent = (listener: string): Observable<Event> => {
		const eventCapturer = this.endRevealElement.firstChild as HTMLElement;
		return fromEvent(eventCapturer, listener)
		.pipe(
			filter(() => eventCapturer[this.horizontal ? "scrollLeft" : "scrollTop"] === 0),
		)
	}

	private readonly getViewSize = (element: HTMLElement): number => element[`${this.nestedScroll ? "client" : "offset"}${this.horizontal ? "Width" : "Height"}`]
		+ Number.parseFloat(getComputedStyle(element).getPropertyValue(this.horizontal ? "margin-left" : "margin-top"))
		+ Number.parseFloat(getComputedStyle(element).getPropertyValue(this.horizontal ? "margin-right": "margin-bottom"));

	private readonly nestedScrollFilter = (shiftAmt: number): boolean => {
		if (!this.nestedScroll) {
			return true;
		}

		if (this.startReveal || this.endReveal) {
			return true;
		}

		const pageElement: HTMLElement = this.items.toArray()[this.pageIndex]?.nativeElement;

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
			filter((difference: number) => Math.abs(difference) >= Math.abs(this.scrollThreshold)),
			filter(this.nestedScrollFilter),
		);

	// TODO: Use pluck wherever necessary.
	private readonly applySwipeOptimization = (swipeStream$: Observable<TouchEvent>, element: HTMLElement): Observable<number> => swipeStream$
		.pipe(
			map(
				(event: TouchEvent) => this.horizontal
					? event.touches[0]?.pageX ?? 0
					: event.touches[0]?.pageY ?? 0,
			),
			bufferCount(2, 1),
			map(([init, end] : [number, number]) => init - end),
			takeUntil(
				concat(
					fromEvent(element, "touchend").pipe(take(1)),
					fromEvent(element, "touchstart").pipe(take(1)),
				)
			),
			filter((difference: number) => Math.abs(difference) >= Math.abs(this.swipeThreshold)),
			repeat(),
		);

	ngOnInit() {
		// ngOnInit
	}

	ngAfterContentInit() {
		this.pagesChildrenChangeEvent.emit(this.items);
		this.calculateMaxScrollableSize();
		if (this.fullpage) {
			this.delta = this.getViewSize(this.items.first.nativeElement);
		}
		this.items.changes.subscribe(() => {
			this.calculateMaxScrollableSize();
		})
	}

	ngAfterViewInit() {
		this.pageEndRevealService.pageEndRevealElement$.subscribe((pageEndRevealElement: HTMLElement) => {
			this.endRevealElement = pageEndRevealElement!;
		});

		// TODO: Add mousewheel, mousescroll, scroll, events to merge
		this.scrollStream$ = merge(
			this.applyScrollOptimization(
				fromEvent(this.hostElement.nativeElement, "wheel"),
			),
			this.allowStartReveal
				? this.applyScrollOptimization(
					this.getStartRevealElementEvent("wheel") as Observable<MouseWheelEvent>,
				).pipe(
					filter((shiftAmt: number) => shiftAmt > 0),
				)
				: NEVER,
			this.allowEndReveal
				? this.applyScrollOptimization(
					this.getEndRevealElementEvent("wheel") as Observable<MouseWheelEvent>,
				).pipe(
					filter((shiftAmt: number) => shiftAmt < 0),
				)
				: NEVER,
		).pipe(
			this.smoothScroll ? identity : throttleTime(this.throttle),
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
				).pipe(
					filter((shiftAmt: number) => shiftAmt > 0),
				)
				: NEVER,
			this.allowEndReveal
				? this.applySwipeOptimization(
					this.getEndRevealElementEvent("touchmove") as Observable<TouchEvent>,
					this.endRevealElement,
				).pipe(
					filter((shiftAmt: number) => shiftAmt < 0),
				)
				: NEVER,
		).pipe(
			this.smoothScroll ? identity : throttleTime(this.throttle),
		);

		this.scrollStream$.subscribe((shiftAmt: number) => {
			this.pageShift(shiftAmt / this.scrollNormalizationFactor);
		});
		this.swipeStream$.subscribe((shiftAmt: number) => {
			this.pageShift(shiftAmt / this.swipeNormalizationFactor);
		});

		// TODO: Race with existing streams
		merge(...this.transitionStartStream$).subscribe();
		merge(...this.transitionEndStream$).subscribe();
	}
}
