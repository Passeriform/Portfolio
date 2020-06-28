import { Component, QueryList, ContentChildren, OnInit, AfterContentInit, HostBinding, Input, ElementRef } from '@angular/core';
import { merge, fromEvent, OperatorFunction, Observable } from 'rxjs';
import { map, scan, takeLast, filter, throttleTime, switchMap, takeUntil } from 'rxjs/operators';

import { SplashStateService } from '../services/splash-state.service';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.sass']
})

export class ScrollableComponent implements OnInit, AfterContentInit {
  private pageIndex = 0;
  private scrollTolerance = 0.1; // scroll sensitivity
  private touchTolerance = 10; // swipe distance in pixels

  @ContentChildren('page') items: QueryList<any>;

  @Input() nosplash: boolean;
  @Input() fullpage: boolean;
  @Input() horizontal: boolean;
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

  private transitionStartStreams = this.transitionStarts.map(event =>
    fromEvent(this.hostElement.nativeElement, event).pipe(
      filter((evt: any) => evt.target === this.hostElement.nativeElement)
    )
  );
  private transitionEndStreams = this.transitionEnds.map(event =>
    fromEvent(this.hostElement.nativeElement, event).pipe(
      filter((evt: any) => evt.target === this.hostElement.nativeElement)
    )
  );

  private scrollStream;
  private swipeStream = fromEvent(this.hostElement.nativeElement, 'touchstart')
    .pipe(
      switchMap((startEvent: TouchEvent) =>
        fromEvent(this.hostElement.nativeElement, 'touchmove')
          .pipe(
            takeUntil(fromEvent(this.hostElement.nativeElement, 'touchend')),
            map((event: TouchEvent) => (this.horizontal) ? event.touches[0].pageX : event.touches[0].pageY),
            scan((acc, prevCoord) => {
              if (this.horizontal) {
                return Math.round(startEvent.touches[0].pageX - prevCoord);
              }
              return Math.round(startEvent.touches[0].pageY - prevCoord);
            }, 0),
            takeLast(1),
            filter(difference => (difference >= this.touchTolerance) || (difference <= -this.touchTolerance)),
          )
      )
    );


  constructor(private hostElement: ElementRef, private splashStateService: SplashStateService) { }

  @HostBinding('style.-webkit-transform')
  @HostBinding('style.-ms-transform')
  @HostBinding('style.transform') get transform(): string {
    if (this.horizontal) {
      return 'translateX(' + (-this.delta * this.pageIndex) + 'vw)';
    }
    return 'translateY(' + (-this.delta * this.pageIndex) + 'vh)';
  }

  pageShift(delta: number) {
    if (delta > 0) {
      this.pageShiftUp();
    } else if (delta < 0) {
      this.pageShiftDown();
    }
  }

  pageShiftUp() {
    this.pageIndex = Math.max(this.pageIndex - 1, 0);
    this.updateSplashState();
  }

  pageShiftDown() {
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    const scrollableWidth = this.hostElement.nativeElement.scrollWidth + this.overshoot - 100*vw;
    const scrollableHeight = this.hostElement.nativeElement.scrollHeight + this.overshoot - 100*vh;

    if (this.horizontal) {
      if (this.delta * (this.pageIndex) * vw >= scrollableWidth) { return; }
    } else {
      if (this.delta * (this.pageIndex) * vh >= scrollableHeight) { return; }
    }

    this.pageIndex = this.pageIndex + 1;
    this.updateSplashState();
  }

  pageReset() {
    this.pageIndex = 0;
    this.updateSplashState();
  }

  updateSplashState() {
    this.splashStateService.changeSplashState(
      (this.pageIndex === 0 && !this.nosplash)
      ? 'focussed'
      : 'blur'
    );
  }

  ngOnInit() {
    this.updateSplashState();
  }

  ngAfterContentInit() {
    this.scrollStream = fromEvent(this.hostElement.nativeElement, 'wheel')
      .pipe(
        map((nextEvent: any) => (this.horizontal) ? -nextEvent.deltaX : -nextEvent.deltaY),
        filter(difference => (difference >= this.scrollTolerance) || (difference <= -this.scrollTolerance)),
        conditionalThrottle(this.throttle === 0, this.throttle),
      );

    this.scrollStream.subscribe(scrollDelta => this.pageShift(scrollDelta));
    this.swipeStream.subscribe(swipeDelta => this.pageShift(swipeDelta));

    merge(...this.transitionStartStreams).subscribe();
    merge(...this.transitionEndStreams).subscribe();}
}

const conditionalThrottle = <T>(cond: boolean, value: number): OperatorFunction<T, T> =>
  (source: Observable<T>): Observable<T> =>
    cond ? source : source.pipe(throttleTime(value));
