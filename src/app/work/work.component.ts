import { DOCUMENT } from "@angular/common";
import type { AfterViewInit, OnInit } from "@angular/core";
import { Component, Inject } from "@angular/core";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";

import { LoaderService } from "@app/loader/services/loader.service";
import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

import type { WorkModel } from "./models/work.interface";
import { WorkService } from "./services/work.service";

@Component({
	selector: "app-work",
	styleUrls: [ "./work.component.scss" ],
	templateUrl: "./work.component.html",
})
export class WorkComponent implements OnInit, AfterViewInit {
	private readonly scrollResetSource$ = new Subject<void>();
	public displayInitialTip = true;
	public readonly marker: string;
	public scrollResetState$: Observable<void> = this.scrollResetSource$.asObservable();
	public selectedModel$: Observable<WorkModel | undefined>;

	constructor(
			@Inject(DOCUMENT) public readonly document: HTMLElement,
			private readonly workService: WorkService,
			private readonly loaderService: LoaderService,
			private readonly splashStateService: SplashStateService,
	) {
		// this.loaderService.flushJobs();
		this.loaderService.beginLoading("[page] load");
	}

	ngOnInit() {
		this.selectedModel$ = this.workService.workSelectedState$;
		this.splashStateService.changeSplashState(SplashState.BLURRED);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading("[page] load");
	}

	public handleOverlayTrigger(): void {
		this.displayInitialTip = false;
	}

	public handleSelection(): void {
		this.scrollResetSource$.next();
	}
}
