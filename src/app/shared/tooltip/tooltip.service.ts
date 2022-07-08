import type { ElementRef } from "@angular/core";
import { Injectable, TemplateRef } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

import { Position } from "@shared/models/cardinals.interface";

@Injectable({
	providedIn: "root",
})
export class TooltipService {
	private readonly templateSource$ = new BehaviorSubject<TemplateRef<ElementRef>>(undefined as unknown as TemplateRef<ElementRef>);
	private readonly showTooltipSource$ = new BehaviorSubject<boolean>(false);
	private readonly positionSource$ = new BehaviorSubject<Position>(Position.BOTTOM);
	private readonly cornerSource$ = new BehaviorSubject<boolean>(false);
	private readonly invertSource$ = new BehaviorSubject<boolean>(false);
	private readonly offsetSource$ = new BehaviorSubject<readonly [ number, number ]>([
		document.documentElement.clientWidth,
		document.documentElement.clientHeight,
	]);

	public readonly templateState$: Observable<TemplateRef<ElementRef>> = this.templateSource$.asObservable();
	public readonly showTooltipState$: Observable<boolean> = this.showTooltipSource$.asObservable();
	public readonly positionState$: Observable<Position> = this.positionSource$.asObservable();
	public readonly cornerState$: Observable<boolean> = this.cornerSource$.asObservable();
	public readonly invertState$: Observable<boolean> = this.invertSource$.asObservable();
	public readonly offsetState$: Observable<readonly [ number, number ]> = this.offsetSource$.asObservable();

	public setTemplate$(template: TemplateRef<ElementRef>): void {
		this.templateSource$.next(template);
	}

	public setShowTooltip$(showTooltip: boolean): void {
		this.showTooltipSource$.next(showTooltip);
	}

	public setPosition$(position: Position): void {
		this.positionSource$.next(position);
	}

	public setCorner$(corner: boolean): void {
		this.cornerSource$.next(corner);
	}

	public setInvert$(invert: boolean): void {
		this.invertSource$.next(invert);
	}

	public setOffset$(offset: readonly [number, number]): void {
		this.offsetSource$.next(offset);
	}
}
