import { Component, ElementRef, HostBinding, Input } from "@angular/core";

import type { Observable } from "rxjs";

import { PageRevealService } from "@core/services/page-reveal.service";

import { Constants } from "./footer.config";
import type { TopAboutModel, TopSocialModel, TopWorkModel } from "./models/footer.interface";
import { FooterVariant } from "./models/footer.interface";
import { FooterService } from "./services/footer.service";

// TODO: Add as an overflow object in scrollable overflow attribute. The footer must reveal from below the scrollable.

@Component({
	selector: "app-footer",
	styleUrls: [ "./footer.component.scss" ],
	templateUrl: "./footer.component.html",
})
export class FooterComponent {
	@Input() private readonly maxItemCount: number = Constants.INITIAL_MAX_ITEM_COUNT;

	@Input() public readonly aboutCount: number = this.maxItemCount;
	@Input() public readonly socialCount: number = Constants.SOCIAL_LINKS_COUNT;
	@Input() public readonly variant: FooterVariant = FooterVariant.STACKED;
	@Input() public readonly workCount: number = this.maxItemCount - 2;

	public aboutEntries$: Observable<readonly TopAboutModel[]>;
	public socialEntries$: Observable<readonly TopSocialModel[]>;
	public workEntries$: Observable<readonly TopWorkModel[]>;

	@HostBinding("class")
	public get variantClass(): FooterVariant {
		return this.variant;
	}

	constructor(
			private readonly pageEndRevealElement: ElementRef<HTMLElement>,
			private readonly pageRevealService: PageRevealService,
			private readonly footerService: FooterService,
	) {
		// TODO: Move this setting logic to app.ts
		this.pageRevealService.setEndRevealElement(pageEndRevealElement.nativeElement);
		this.footerService.refreshLinks({
			aboutCount: this.aboutCount,
			socialCount: this.socialCount,
			workCount: this.workCount,
		});
		this.aboutEntries$ = this.footerService.aboutEntriesState$;
		this.socialEntries$ = this.footerService.socialEntriesState$;
		this.workEntries$ = this.footerService.workEntriesState$;
	}

	public popupPersonalitySelector(): void {

		// TODO: Call PersonalitySelectorService

	}

	public popupSitemap(): void {

		// TODO: Call SitemapService

	}
}
