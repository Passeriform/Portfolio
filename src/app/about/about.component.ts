import type { AfterViewInit, OnInit } from "@angular/core";
import { DOCUMENT, NgIf } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Position } from "@shared/models/cardinals.interface";
import { LoaderService } from "@app/loader/services/loader.service";
import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

import type { AboutModel } from "./models/about.interface";
import { SocialGlyphsComponent } from "../shared/social-glyphs/social-glyphs.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { NamecardComponent } from "./namecard/namecard.component";
import { ScrollableComponent } from "../shared/scrollable/scrollable.component";

@Component({
	imports: [
		ContactFormComponent,
		NamecardComponent,
		NgIf,
		ScrollableComponent,
		SocialGlyphsComponent,
	],
	selector: "app-about",
	standalone: true,
	styleUrls: [ "./about.component.scss" ],
	templateUrl: "./about.component.html",
})
export class AboutComponent implements OnInit, AfterViewInit {
	public model: AboutModel;
	public readonly Position = Position;

	constructor(
			@Inject(DOCUMENT) public readonly document: HTMLElement,
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
			(data: Readonly<{ model: readonly AboutModel[] }>) => {
				this.model = data.model[0]!;
			},
		);

		this.splashStateService.changeSplashState(SplashState.BLURRED);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading("[page] load");
	}
}
