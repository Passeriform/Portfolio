// TODO: Remove lag from scroll/swipe.
import { Component, QueryList, ContentChildren, OnInit, AfterContentInit, HostBinding, Input, ElementRef } from '@angular/core';

import { merge, fromEvent, OperatorFunction, Observable } from 'rxjs';
import { map, race, filter, throttleTime, mergeMap, take, takeUntil } from 'rxjs/operators';

import { SplashState, SplashStateService } from '@app/core/services/splash-state.service';

@Component({
	selector: 'app-scrollable',
	templateUrl: './scrollable.component.html',
	styleUrls: ['./scrollable.component.sass'],
})
export class ScrollableComponent implements OnInit, AfterContentInit {
	private pageIndex = 0;
	private scrollTolerance = 0.1; // Scroll sensitivity
	private touchTolerance = 0.1; // Swipe distance in pixels

	@ContentChildren('page') items: QueryList<HTMLElement>;

	@Input() injectSplash: boolean;
	@Input() collapsed: boolean;
	@Input() fullpage: boolean;
	@Input() horizontal: boolean;
	// TODO: Add smoothen input to remove scrollcancel
	@Input() delta = 100;
	@Input() overshoot = 0;
	@Input() throttle = 500;

	private transitionStarts = [
		'transitionstart',
		// 'oTransitionStart',
		// 'webkitTransitionStart',
	];

	private transitionEnds = [
		'transitionend',
		// 'oTransitionEnd',
		// 'webkitTransitionEnd',
	];

	private transitionStartStreams = this.transitionStarts.map((event) =>
		fromEvent(this.hostElement.nativeElement, event).pipe(
			// TODO: Configure this properly to support nested scrolling
			filter((evt: Event) => evt.target === this.hostElement.nativeElement)
		)
	);
	private transitionEndStreams = this.transitionEnds.map((event) =>
		fromEvent(this.hostElement.nativeElement, event).pipe(
			// TODO: Configure this properly to support nested scrolling
			filter((evt: Event) => evt.target === this.hostElement.nativeElement)
		)
	);

	private scrollStream: Observable<number>;
	private swipeStream: Observable<number>;

	constructor(private hostElement: ElementRef, private splashStateService: SplashStateService) { }

	@HostBinding('style.-webkit-transform')
	@HostBinding('style.-ms-transform')
	@HostBinding('style.transform') get transform(): string {
		if (this.horizontal) {
			return `translateX(${-this.delta * this.pageIndex}vw)`;
		}

		return `translateY(${-this.delta * this.pageIndex}vh)`;
	}

	pageShift(shiftAmt: number): void {
		if (shiftAmt < 0) {
			this.pageShiftUp(shiftAmt);
		} else if (shiftAmt > 0) {
			this.pageShiftDown(shiftAmt);
		}
	}

	// TODO: Justify pulling the delta value
	pageShiftUp(delta: number): void {
		this.pageIndex = Math.max(this.pageIndex - 1, 0);
		this.updateSplashState();
	}

	// TODO: Justify pulling the delta value
	pageShiftDown(delta: number): void {
		const vw = document.documentElement.offsetWidth / 100;
		const vh = document.documentElement.offsetHeight / 100;
		const scrollableWidth = this.hostElement.nativeElement.scrollWidth + this.overshoot - vw * 100;
		const scrollableHeight = this.hostElement.nativeElement.scrollHeight + this.overshoot - vh * 100;

		if (this.horizontal) {
			const expectedScrollWidth = Math.floor(this.delta * (this.pageIndex + 1) * vw);
			if (expectedScrollWidth > scrollableWidth) { return; }
		} else {
			const expectedScrollHeight = Math.floor(this.delta * (this.pageIndex + 1) * vh);
			if (expectedScrollHeight > scrollableHeight) { return; }
		}

		this.pageIndex++;
		this.updateSplashState();
	}

	pageReset(): void {
		this.pageIndex = 0;
		this.updateSplashState();
	}

	updateSplashState(): void {
		if (this.injectSplash) {
			this.splashStateService.changeSplashState(
				(this.pageIndex === 0 && !this.collapsed)
					? SplashState.Focussed
					: SplashState.Blurred
			);
		}
	}

	ngOnInit() {
		this.updateSplashState();
	}

	ngAfterContentInit() {
		this.scrollStream = fromEvent(this.hostElement.nativeElement, 'wheel')
			.pipe(
				map((nextEvent: MouseWheelEvent) => (this.horizontal) ? nextEvent.deltaX : nextEvent.deltaY),
				filter((difference) => (Math.abs(difference) >= Math.abs(this.scrollTolerance))),
				// TODO: Consider runOutside if conditional throttling can be provided there.
				conditionalThrottle(this.throttle === 0, this.throttle),
		);

		this.swipeStream = fromEvent(this.hostElement.nativeElement, 'touchmove')
			.pipe(
				conditionalThrottle(this.throttle === 0, this.throttle),
				map((event: TouchEvent) =>
					this.horizontal ? event.touches[0].pageX : event.touches[0].pageY
					// No need to check for empty event as its captured by fromEvent
				),
				mergeMap((init: number) =>
					fromEvent(this.hostElement.nativeElement, 'touchmove')
						.pipe(
							race(
								fromEvent(this.hostElement.nativeElement, 'touchend')
									.pipe(
										takeUntil(fromEvent(this.hostElement.nativeElement, 'touchstart'))
									),
							),
							map((event: TouchEvent) =>
								event.touches[0]
									? (this.horizontal)
										? event.touches[0].pageX
										: event.touches[0].pageY
									: 0 // Find a default here
							),
							map((swiped) => (init - swiped)),
							take(1),
							filter((difference) => (Math.abs(difference) >= Math.abs(this.touchTolerance))),
							map((scaled) => scaled / 5)
						)
				),
		);

		this.scrollStream.subscribe((shiftAmt: number) => this.pageShift(shiftAmt));
		this.swipeStream.subscribe((shiftAmt: number) => this.pageShift(shiftAmt));

		merge(...this.transitionStartStreams).subscribe();
		merge(...this.transitionEndStreams).subscribe();

		this.updateSplashState();
	}
}

const conditionalThrottle = <T>(cond: boolean, value: number): OperatorFunction<T, T> =>
	(source: Observable<T>): Observable<T> =>
		cond ? source : source.pipe(throttleTime(value));
