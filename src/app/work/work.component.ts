import type { AfterViewInit, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";
import { LoaderService } from "@app/loader/loader.service";

import type { WorkModel } from "./work.interface";
import { WorkService } from "./services/work.service";

@Component({
	selector: "app-work",
	styleUrls: [ "./work.component.scss" ],
	templateUrl: "./work.component.html",
})
export class WorkComponent implements OnInit, AfterViewInit {
	public model: readonly WorkModel[];

	public selected: WorkModel | undefined;

	public readonly marker: string;

	constructor(
			private readonly workService: WorkService,
			private readonly loaderService: LoaderService,
			private readonly route: ActivatedRoute,
			private readonly splashStateService: SplashStateService,
	) {
		// this.loaderService.flushJobs();
		this.loaderService.beginLoading("[page] load");
	}

	ngOnInit() {
		this.route.data.subscribe(
			(data: { readonly model: readonly WorkModel[] }) => {
				this.model = data.model;
			},
		);

		this.workService.workSelectedState$.subscribe((entity) => {
			this.selected = entity;
		});
	}

	ngAfterViewInit() {
		this.loaderService.endLoading("[page] load");

		this.splashStateService.changeSplashState(SplashState.BLURRED);
	}
}
