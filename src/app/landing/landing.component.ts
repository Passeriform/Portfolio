import type { AfterViewInit, OnInit } from "@angular/core";
import { Component } from "@angular/core";

import { LoaderService } from "@app/loader/services/loader.service";
import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

@Component({
	selector: "app-landing",
	styleUrls: [ "./landing.component.scss" ],
	templateUrl: "./landing.component.html",
})
export class LandingComponent implements OnInit, AfterViewInit {
	constructor(
			private readonly loaderService: LoaderService,
			private readonly splashStateService: SplashStateService,
	) {
		this.loaderService.beginLoading("[page] load");
	}

	ngOnInit() {
		this.splashStateService.changeSplashState(SplashState.FOCUSSED);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading("[page] load");
	}

	public handlePageChange(pageIndex: number): void {
		this.splashStateService.changeSplashState(
			pageIndex === 0
				? SplashState.FOCUSSED
				: SplashState.BLURRED,
		);
	}
}
