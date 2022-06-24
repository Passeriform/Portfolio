import type { ElementRef } from "@angular/core";
import { Injectable, TemplateRef } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

import { Position } from "@shared/models/cardinals.interface";

@Injectable()
export class TooltipService {
	private readonly templateSource$ = new BehaviorSubject<TemplateRef<ElementRef>>(undefined as unknown as TemplateRef<ElementRef>);
	private readonly showTooltipSource$ = new BehaviorSubject<boolean>(false);
	private readonly positionSource$ = new BehaviorSubject<Position>(Position.BOTTOM);
	private readonly invertSource$ = new BehaviorSubject<boolean>(false);
	private readonly offsetSource$ = new BehaviorSubject<readonly [ number, number ]>([ 0, 0 ]);

	public readonly templateState$ = this.templateSource$.asObservable();
	public readonly showTooltipState$ = this.showTooltipSource$.asObservable();
	public readonly positionState$ = this.positionSource$.asObservable();
	public readonly invertState$ = this.invertSource$.asObservable();
	public readonly offsetState$ = this.offsetSource$.asObservable();

	public setTemplate$(template: TemplateRef<ElementRef>): void {
		this.templateSource$.next(template);
	}

	public setShowTooltip$(showTooltip: boolean): void {
		this.showTooltipSource$.next(showTooltip);
	}

	public setPosition$(position: Position): void {
		this.positionSource$.next(position);
	}

	public setInvert$(invert: boolean): void {
		this.invertSource$.next(invert);
	}

	public setOffset$(offset: readonly [number, number]): void {
		this.offsetSource$.next(offset);
	}
}
