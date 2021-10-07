import { Component, ElementRef, HostBinding, Input } from "@angular/core";
import type { OnInit } from "@angular/core";

import { LinkModel } from "@shared/models/link.interface";
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
	@Input() public readonly aboutCount = this.maxItemCount;
	@Input() public readonly socialCount = Constants.SOCIAL_LINKS_COUNT;
	@Input() public readonly workCount = this.maxItemCount - 2;
	@Input() public readonly variant: string;

	public abouts: LinkModel[];
	public socials: LinkModel[];
	public works: LinkModel[];

	@HostBinding("class")
	public get Class(): string {
		return this.variant;
	}

	constructor(
			private readonly footerElement: ElementRef,
			private readonly footerService: FooterService,
	) {
		this.footerService.setFooterElement(footerElement.nativeElement);
		this.footerService.refreshLinks({
			aboutCount: this.aboutCount,
			socialCount: this.socialCount,
			workCount: this.workCount,
		});
		this.footerService.aboutState$.subscribe((abouts: LinkModel[]): void => {
			this.abouts = abouts;
		});
		this.footerService.worksState$.subscribe((works: LinkModel[]): void => {
			this.works = works;
		});
		this.footerService.socialsState$.subscribe((socials: LinkModel[]): void => {
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
