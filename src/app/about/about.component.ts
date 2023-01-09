import type { AfterViewInit, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Position } from "@shared/models/cardinals.interface";
import { LoaderService } from "@app/loader/services/loader.service";
import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

import type { AboutModel } from "./models/about.interface";

@Component({
	selector: "app-about",
	styleUrls: [ "./about.component.scss" ],
	templateUrl: "./about.component.html",
})
export class AboutComponent implements OnInit, AfterViewInit {
	public model: AboutModel;
	public readonly Position = Position;

	constructor(
			private readonly route: ActivatedRoute,
			private readonly loaderService: LoaderService,
			private readonly splashStateService: SplashStateService,
	) {
		// TODO: Improve this loader flushing

		// this.loaderService.flushJobs();

		this.loaderService.beginLoading("[page] load");
	}

	ngOnInit() {
		this.route.data.subscribe(
			(data: { readonly model: AboutModel }) => {
				this.model = data.model;
			},
		);

		this.splashStateService.changeSplashState(SplashState.BLURRED);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading("[page] load");
	}
}
