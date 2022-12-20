import { fromEvent, merge, Observable } from "rxjs";
import { bufferCount, filter, map, repeat, take, takeUntil } from "rxjs/operators";

import { Orientation } from '@shared/models/cardinals.interface';

import { pluck } from "./rxjs";

const SWIPE_SCALING_FACTOR = 1;
const SCROLL_SCALING_FACTOR = 90;

export const fromMotionEvent = (
  element: HTMLElement,
  orientation: Orientation
): Observable<number> => merge(
  fromEvent<TouchEvent>(element, "touchmove").pipe(
    pluck("touches"),
    map(([ touch ]: TouchList) => touch),
    map(
      (touch: Touch | undefined) => orientation === Orientation.HORIZONTAL
        ? touch?.pageX ?? 0
        : touch?.pageY ?? 0,
    ),
    bufferCount(2, 1),
    map(([ init, end ]: [ number, number ]) => init - end),
    takeUntil(
      merge(
        fromEvent(element, "touchend").pipe(take(1)),
        fromEvent(element, "touchstart").pipe(take(1)),
      ),
    ),
    map(shiftAmt => shiftAmt / SWIPE_SCALING_FACTOR),
    repeat(),
  ),
  fromEvent<WheelEvent>(element, "wheel").pipe(
    pluck(orientation === Orientation.HORIZONTAL ? "deltaX" : "deltaY"),
    map(shiftAmt => shiftAmt / SCROLL_SCALING_FACTOR),
  )
);

export const selfTargetFilter = <E extends Event>(sourceTarget: HTMLElement | EventTarget) => filter((actualEvent: E) => actualEvent.target === sourceTarget)
