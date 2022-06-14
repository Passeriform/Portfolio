import { HttpClient } from "@angular/common/http";
import { TemplateRef, Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";

const DEFAULT_TEMPLATE_REF = {
	createEmbeddedView: (context: any) => ({
		context,
		_lView: [,true,],
		rootNodes: [],
	}),
}

@Injectable()
export class TooltipService {
	private readonly templateSource$ = new BehaviorSubject<TemplateRef<any>>(null as unknown as TemplateRef<any>);
	private readonly showTooltipSource$ = new BehaviorSubject<boolean>(false);
	private readonly positionSource$ = new BehaviorSubject<readonly [number, number]>([0, 0]);

	public readonly templateState$ = this.templateSource$.asObservable();
	public readonly showTooltipState$ = this.showTooltipSource$.asObservable();
	public readonly positionState$ = this.positionSource$.asObservable();

	constructor() { }

	public setTemplate$(template: TemplateRef<any>): void {
		this.templateSource$.next(template);
	}

	public setShowTooltip$(showTooltip: boolean): void {
		this.showTooltipSource$.next(showTooltip);
	}

	public setPosition$(position: readonly [top: number, left: number]): void {
		this.positionSource$.next(position);
	}
}
