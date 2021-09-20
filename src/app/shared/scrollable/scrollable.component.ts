// TODO: Remove lag from scroll/swipe.

import type { AfterViewInit, OnInit, QueryList } from "@angular/core";
import { Component, ContentChildren, ElementRef, HostBinding, Input, Output, EventEmitter } from "@angular/core";

import { fromEvent, merge, identity } from "rxjs";
import type { Observable } from "rxjs";
import { filter, map, mergeMap, raceWith, first, takeUntil, throttleTime } from "rxjs/operators";

import { Constants } from "./scrollable.config";

@Component({
	selector: "app-scrollable",
	styleUrls: [ "./scrollable.component.scss" ],
	templateUrl: "./scrollable.component.html",
})
export class ScrollableComponent implements OnInit, AfterViewInit {
	// TODO: Add smoothen input to remove scrollcancel

	// TODO: Throw error if nestedScroll is enabled without fullpage

	@Input() private readonly nestedScroll = false;
	@Input() private readonly delta = Constants.DELTA_DEFAULT;
	@Input() private readonly overshoot = Constants.OVERSHOOT_DEFAULT;
	@Input() private readonly throttle = Constants.THROTTLE_DEFAULT;
	@Input() private readonly fullpage: boolean;
	@Input() private readonly horizontal: boolean;

	@Output() private readonly pageChangeEvent: EventEmitter<number> = new EventEmitter();

	@ContentChildren("page", { read: ElementRef }) private readonly items: QueryList<ElementRef>;

	private pageIndex: number = Constants.INITIAL_PAGE_INDEX;

	// Scroll sensitivity
	private readonly scrollTolerance: number = Constants.SCROLL_TOLERANCE;

	// Swipe distance in pixels
	private readonly touchTolerance: number = Constants.TOUCH_TOLERANCE;

	private readonly transitionStarts: readonly string[] = [
		"transitionstart",

		/*
		 * "oTransitionStart",
		 * "webkitTransitionStart",
		 */
	];

	private readonly transitionEnds: readonly string[] = [
		"transitionend",

		/*
		 * "oTransitionEnd",
		 * "webkitTransitionEnd",
		 */
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

	constructor(private readonly hostElement: ElementRef) { }

	@HostBinding("style.-webkit-transform")
	@HostBinding("style.-ms-transform")
	@HostBinding("style.transform") get transform(): string {
		if (this.horizontal) {
			return `translateX(${-this.delta * this.pageIndex}vw)`;
		}

		return `translateY(${-this.delta * this.pageIndex}vh)`;
	}

	private pageShift(shiftAmt: number): void {
		if (shiftAmt < 0) {
			this.pageShiftUp(shiftAmt);
		} else if (shiftAmt > 0) {
			this.pageShiftDown(shiftAmt);
		}
	}

	private pageShiftUp(delta: number): void {
		// TODO: Justify pulling the delta value

		this.pageIndex = Math.max(this.pageIndex - 1, 0);

		this.pageChangeEvent.emit(this.pageIndex);
	}

	private pageShiftDown(delta: number): void {
		// TODO: Justify pulling the delta value

		const childElements = this.items.toArray().map(
			(elementReference: ElementRef<HTMLElement>) => elementReference.nativeElement,
		);
		if (childElements.length === 0) {
			return;
		}

		// NOTE: Assumes all elements are equal and thus picks first and computes styles

		// NOTE: Major performance hit. For specific cases, consider providing an option for manual overshoot specification

		const itemWidth: number = childElements[0].offsetWidth
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-left"))
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-right"));
		const itemHeight: number = childElements[0].offsetHeight
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-top"))
			+ Number.parseFloat(getComputedStyle(childElements[0]).getPropertyValue("margin-bottom"));
		const scrollableWidth: number = (childElements.length - 1) * itemWidth;
		const scrollableHeight: number = (childElements.length - 1) * itemHeight;

		const vw: number = document.documentElement.offsetWidth;
		const vh: number = document.documentElement.offsetHeight;

		if (this.horizontal) {
			const expectedScrollWidth: number = Math.ceil(this.delta * (vw / 100) * (this.pageIndex + 1));
			if (expectedScrollWidth > scrollableWidth) {
				return;
			}
		} else {
			const expectedScrollHeight: number = Math.ceil(this.delta * (vh / 100) * (this.pageIndex + 1));
			if (expectedScrollHeight > scrollableHeight) {
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

	private readonly nestedScrollFilter = (shiftAmt: number) => {
		if (!this.nestedScroll) {
			return true;
		}

		const pageElement: HTMLElement = this.items.toArray()[this.pageIndex].nativeElement;

		const {
			offsetHeight,
			offsetWidth,
			scrollHeight,
			scrollLeft,
			scrollTop,
			scrollWidth,
		}: {
			readonly offsetHeight: number;
			readonly offsetWidth: number;
			readonly scrollHeight: number;
			readonly scrollLeft: number;
			readonly scrollTop: number;
			readonly scrollWidth: number;
		} = pageElement;
		const offsetAxis: number = this.horizontal ? offsetWidth : offsetHeight;
		const scrollAxis: number = this.horizontal ? scrollWidth : scrollHeight;
		const scrollAxisDistance: number = this.horizontal ? scrollLeft : scrollTop;

		if (shiftAmt < 0) {
			// Scrolling up
			return scrollAxisDistance === 0;
		}

		// Scrolling down
		return scrollAxis - offsetAxis === scrollAxisDistance;
	};

	ngOnInit() {
		// ngOnInit
	}

	ngAfterViewInit() {
		this.scrollStream$ = fromEvent(this.hostElement.nativeElement as EventTarget, "wheel")
			.pipe(
				map((nextEvent: WheelEvent) => this.horizontal ? nextEvent.deltaX : nextEvent.deltaY),
				filter((difference: number) => Math.abs(difference) >= Math.abs(this.scrollTolerance)),
				filter((difference: number) => this.nestedScrollFilter(difference)),

				// TODO: Consider runOutside if conditional throttling can be provided there.

				this.throttle === 0 ? identity : throttleTime(this.throttle),
			);

		this.swipeStream$ = fromEvent(this.hostElement.nativeElement as EventTarget, "touchmove")
			.pipe(
				this.throttle === 0 ? identity : throttleTime(this.throttle),
				map(
					// NOTE: No need to check for empty event as its captured by fromEvent
					(event: TouchEvent) => this.horizontal ? event.touches[0].pageX : event.touches[0].pageY,
				),
				mergeMap(
					(init: number) => fromEvent(this.hostElement.nativeElement as EventTarget, "touchmove")
						.pipe(
							raceWith(
								fromEvent(this.hostElement.nativeElement as EventTarget, "touchend")
									.pipe(
										takeUntil(fromEvent(this.hostElement.nativeElement as EventTarget, "touchstart")),
									),
							),
							map(
								(event: TouchEvent) => this.horizontal
									? event.touches[0].pageX ?? 0
									: event.touches[0].pageY ?? 0,
							),
							map((swiped: number) => init - swiped),
							first(),
							filter((difference: number) => Math.abs(difference) >= Math.abs(this.touchTolerance)),
							map((scaled: number) => scaled / Constants.SWIPE_SCALE_FACTOR),
						),
				),
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
