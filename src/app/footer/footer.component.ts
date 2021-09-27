import { Component, ElementRef, HostBinding, Input } from "@angular/core";
import type { OnInit } from "@angular/core";

import { Constants } from "./footer.config";
import { FooterService } from "./footer.service";

// TODO: Add as an overflow object in scrollable overflow attribute. The footer must reveal from below the scrollabe

@Component({
	selector: "app-footer",
	styleUrls: [
		"./footer.component.scss",
		"./separator.scss",
	],
	templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {
	@Input() public readonly maxItemCount = Constants.INITIAL_MAX_ITEM_COUNT;

	@Input() public readonly variant: string;

	public works;

	public abouts;

	public socials;

	@HostBinding("class")
	public get Class(): string {
		return this.variant;
	}

	constructor(
		private readonly footerElement: ElementRef,
		private readonly footerService: FooterService,
	) {
		this.footerService.setFooterElement(footerElement.nativeElement);
		this.footerService.refreshLinks(this.maxItemCount);
		this.footerService.worksState$.subscribe((works) => {
			this.works = works;
		});
		this.footerService.aboutState$.subscribe((abouts) => {
			this.abouts = abouts;
		});
		this.footerService.socialsState$.subscribe((socials) => {
			this.socials = socials;
		});
	}

	ngOnInit() {
		// ngOnInit
	}

	public popupSitemap(): void {

		// TODO: Call SitemapService

	}

	public popupPersonalitySelector(): void {

		// TODO: Call PersonalitySelectorService

	}
}
