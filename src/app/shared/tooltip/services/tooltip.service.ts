import { Injectable } from "@angular/core";
import type { RouterEvent } from "@angular/router";
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
		left: document.documentElement.clientWidth / 2,
		position: Position.BOTTOM,
		show: false,
		template: undefined,
		top: document.documentElement.clientHeight / 2,
	});

	public readonly templateConfigState$: Observable<TooltipTemplateConfig> = this.templateConfigSource$.asObservable();

	constructor(private readonly router: Router) {
		this.router.events.pipe(
			filter((routerEvent: RouterEvent) => routerEvent instanceof NavigationEnd),
		).subscribe(() => {
			this.setTemplateConfig$({ show: false });
		});
	}

	public setTemplateConfig$(templateConfig: Partial<TooltipTemplateConfig>): void {
		// eslint-disable-next-line rxjs/no-subject-value
		this.templateConfigSource$.next({ ...this.templateConfigSource$.value, ...templateConfig });
	}
}
