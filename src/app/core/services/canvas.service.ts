import type { ElementRef } from "@angular/core";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CanvasService {
	private canvasElement: ElementRef<HTMLCanvasElement>;
	private canvasContext: CanvasRenderingContext2D;
	private readonly canvasElementSource$ = new BehaviorSubject<ElementRef<HTMLCanvasElement> | undefined>(undefined);
	private readonly canvasContextSource$ = new BehaviorSubject<CanvasRenderingContext2D | undefined>(undefined);

	public readonly canvasElement$: Observable<ElementRef<HTMLCanvasElement> | undefined> = this.canvasElementSource$.asObservable();
	public readonly canvasContext$: Observable<CanvasRenderingContext2D | undefined> = this.canvasContextSource$.asObservable();

	constructor() {
		this.canvasElementSource$.subscribe((canvasElement: ElementRef<HTMLCanvasElement>) => {
			this.canvasElement = canvasElement;
		});
		this.canvasContextSource$.subscribe((canvasContext: CanvasRenderingContext2D) => {
			this.canvasContext = canvasContext;
		});
	}

	public setCanvasElement(canvas: ElementRef<HTMLCanvasElement>): void {
		this.canvasElementSource$.next(canvas);
	}

	public refreshContext(): void {
		this.canvasContextSource$.next(
			this.canvasElement.nativeElement.getContext("2d") as CanvasRenderingContext2D | undefined,
		);
	}

	public drawDot(
			{ color, radius, xPos, yPos }:
			{
				readonly color: string;
				readonly radius: number;
				readonly xPos: number;
				readonly yPos: number;
			},
	): void {
		this.canvasContext.beginPath();
		this.canvasContext.fillStyle = color;
		/* eslint-disable-next-line no-magic-numbers */
		this.canvasContext.arc(xPos, yPos, radius, 0, Math.PI * 2, true);
		this.canvasContext.fill();
	}
}
