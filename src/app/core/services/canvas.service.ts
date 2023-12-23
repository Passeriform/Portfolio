import type { ElementRef } from "@angular/core";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CanvasService {
	private canvasContext: CanvasRenderingContext2D;
	private readonly canvasContextSource$ = new BehaviorSubject<CanvasRenderingContext2D | undefined>(undefined);
	private canvasElement: ElementRef<HTMLCanvasElement>;
	private readonly canvasElementSource$ = new BehaviorSubject<ElementRef<HTMLCanvasElement> | undefined>(undefined);

	public readonly canvasContext$: Observable<CanvasRenderingContext2D | undefined> = this.canvasContextSource$.asObservable();
	public readonly canvasElement$: Observable<ElementRef<HTMLCanvasElement> | undefined> = this.canvasElementSource$.asObservable();

	constructor() {
		this.canvasContextSource$.subscribe((canvasContext: CanvasRenderingContext2D) => {
			this.canvasContext = canvasContext;
		});
		this.canvasElementSource$.subscribe((canvasElement: ElementRef<HTMLCanvasElement>) => {
			this.canvasElement = canvasElement;
		});
	}

	public drawDot(
			{ color, radius, xPos, yPos }:
			Readonly<{
				color: string;
				radius: number;
				xPos: number;
				yPos: number;
			}>,
	): void {
		this.canvasContext.beginPath();
		this.canvasContext.fillStyle = color;
		/* eslint-disable-next-line no-magic-numbers */
		this.canvasContext.arc(xPos, yPos, radius, 0, Math.PI * 2, true);
		this.canvasContext.fill();
	}

	public refreshContext(): void {
		this.canvasContextSource$.next(
			this.canvasElement.nativeElement.getContext("2d") as CanvasRenderingContext2D | undefined,
		);
	}

	public setCanvasElement(canvas: ElementRef<HTMLCanvasElement>): void {
		this.canvasElementSource$.next(canvas);
	}
}
