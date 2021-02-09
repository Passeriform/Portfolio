import { Injectable, ElementRef } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CanvasService {
	private canvasElementSource = new BehaviorSubject<ElementRef<HTMLCanvasElement>>(undefined);
	private canvasContextSource = new BehaviorSubject<CanvasRenderingContext2D>(undefined);

	canvasElement$: Observable<ElementRef<HTMLCanvasElement>> = this.canvasElementSource.asObservable();
	canvasContext$: Observable<CanvasRenderingContext2D> = this.canvasContextSource.asObservable();

	constructor() { }

	setCanvasElement(canvas: ElementRef<HTMLCanvasElement>): void {
		this.canvasElementSource.next(canvas);
	}

	refreshContext(): void {
		this.canvasContextSource.next(
			this.canvasElementSource.value.nativeElement.getContext('2d')
		);
	}

	drawDot(
		{ x, y, radius, color }:
			{
				x: number;
				y: number;
				radius: number;
				color: string;
			}
	): void {
		this.canvasContextSource.value.beginPath();
		this.canvasContextSource.value.fillStyle = color;
		this.canvasContextSource.value.arc(x, y, radius, 0, Math.PI * 2, true);
		this.canvasContextSource.value.fill();
	}
}
