import type { ElementRef } from "@angular/core";
import { Injectable, TemplateRef } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable()
export class TooltipService {
	private readonly templateSource$ = new BehaviorSubject<TemplateRef<ElementRef>>(undefined as unknown as TemplateRef<ElementRef>);
	private readonly showTooltipSource$ = new BehaviorSubject<boolean>(false);
	private readonly positionSource$ = new BehaviorSubject<readonly [ number, number ]>([ 0, 0 ]);

	public readonly templateState$ = this.templateSource$.asObservable();
	public readonly showTooltipState$ = this.showTooltipSource$.asObservable();
	public readonly positionState$ = this.positionSource$.asObservable();

	public setTemplate$(template: TemplateRef<ElementRef>): void {
		this.templateSource$.next(template);
	}

	public setShowTooltip$(showTooltip: boolean): void {
		this.showTooltipSource$.next(showTooltip);
	}

	public setPosition$(position: readonly [number, number]): void {
		this.positionSource$.next(position);
	}
}
