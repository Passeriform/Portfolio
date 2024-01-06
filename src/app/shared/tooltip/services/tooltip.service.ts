import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

import { Position } from "@shared/models/cardinals.interface";

import type { TooltipTemplateConfig } from "../tooltip.interface";

// TODO: Make all properties dynamic and enforced by types instead of creating new subjects for each

@Injectable({
	providedIn: "root",
})
export class TooltipService {
	private readonly templateConfigSource$ = new BehaviorSubject<TooltipTemplateConfig>({
		contentPadding: true,
		corner: false,
		invert: false,
		left: 0,
		position: Position.BOTTOM,
		show: false,
		template: undefined,
		top: 0,
	});

	public readonly templateConfigState$: Observable<TooltipTemplateConfig> = this.templateConfigSource$.asObservable();

	constructor(
			@Inject(DOCUMENT) private readonly document: Document,
			private readonly router: Router,
	) {
		this.router.events.pipe(
			filter((routerEvent) => routerEvent instanceof NavigationEnd),
		).subscribe(() => {
			const { height, width } = this.document.documentElement.getBoundingClientRect();
			this.updateTemplateConfig$({
				left: width / 2,
				show: false,
				top: height / 2,
			});
		});
	}

	public updateTemplateConfig$(templateConfig: Partial<TooltipTemplateConfig>): void {
		// eslint-disable-next-line rxjs/no-subject-value
		this.templateConfigSource$.next({ ...this.templateConfigSource$.value, ...templateConfig });
	}
}
