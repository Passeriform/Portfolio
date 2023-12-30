import type { Observable } from "rxjs";
import { fromEvent, merge } from "rxjs";
import { bufferCount, map, repeat, take, takeUntil } from "rxjs/operators";

import { Orientation } from "@shared/models/cardinals.interface";

import { pluck } from "./rxjs";

const SWIPE_SCALING_FACTOR = 20;
const SCROLL_SCALING_FACTOR = 20;

export const fromMotionEvent = (
		element: Readonly<HTMLElement>,
		orientation: Orientation,
): Readonly<Observable<number>> => merge(
	fromEvent<TouchEvent>(element, "touchmove", { capture: true }).pipe(
		pluck("touches"),
		map(([ touch ]: TouchList) => touch),
		map(
			(touch: Touch | undefined) => orientation === Orientation.HORIZONTAL
				? touch?.pageX ?? 0
				: touch?.pageY ?? 0,
		),
		bufferCount(2, 2),
		map(([init, end]: [number, number]) => init - end),
		map((shiftAmt) => shiftAmt / SWIPE_SCALING_FACTOR),
		// TODO: Use conditional logic from scrollable component to determine when to toggle stream instead of using takeUntil
		takeUntil(
			merge(
				fromEvent(element, "touchend").pipe(take(1)),
				fromEvent(element, "touchstart").pipe(take(1)),
			),
		),
		repeat(),
	),
  // TODO: Make sure wheel event works in case of nested scrollable use-case like showcase.
	fromEvent<WheelEvent>(element, "wheel", { capture: true }).pipe(
		pluck(orientation === Orientation.HORIZONTAL ? "deltaX" : "deltaY"),
		map((shiftAmt) => shiftAmt / SCROLL_SCALING_FACTOR),
	),
);

export const stopClickPropagation = (clickEvent: Readonly<MouseEvent>): void => {
	clickEvent.stopPropagation();
};

export const propagateClickToChildren = (clickEvent: Readonly<KeyboardEvent | MouseEvent | TouchEvent>): void => {
	const target: Readonly<HTMLElement> = (
		clickEvent.target ?? clickEvent.currentTarget
	) as HTMLElement;

	[ ...target.children ].forEach((child: Readonly<HTMLElement>) => {
		// TODO: Propagate the source event rather than explicitly clicking
		child.click();
	});
};
