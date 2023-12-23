import { DOCUMENT } from "@angular/common";
import type { AfterViewInit, OnInit } from "@angular/core";
import { Component, Inject } from "@angular/core";

import { LoaderService } from "@app/loader/services/loader.service";
import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";
import { UpdateRollComponent } from "./update-roll/update-roll.component";
import { CageGridDirective } from "../shared/cage-grid/directives/cage-grid.directive";
import { CageGridComponent } from "../shared/cage-grid/cage-grid.component";
import { SweeperComponent } from "./sweeper/sweeper.component";
import { ScrollableComponent } from "../shared/scrollable/scrollable.component";

@Component({
	imports: [
		CageGridComponent,
		CageGridDirective,
		ScrollableComponent,
		SweeperComponent,
		UpdateRollComponent,
	],
	selector: "app-landing",
	standalone: true,
	styleUrls: [ "./landing.component.scss" ],
	templateUrl: "./landing.component.html",
})
export class LandingComponent implements OnInit, AfterViewInit {
	constructor(
			@Inject(DOCUMENT) public readonly document: HTMLElement,
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
