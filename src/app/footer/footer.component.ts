import { Component, Input, OnInit, HostBinding } from '@angular/core';

import { LinkModel } from './link.interface';
import { FooterService } from './footer.service';
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.sass', './separator.sass'],
})
export class FooterComponent implements OnInit {

	public products;
	public abouts;
	public socials;

	@Input() maxItemCount = 5;

	@HostBinding('class')
	get Class() {
		return this.variant;
	}

	@Input() variant: string;

	constructor(private footerService: FooterService) {
		this.footerService.refreshLinks(this.maxItemCount);
		this.footerService.productsState$.subscribe((products) => this.products = products);
		this.footerService.aboutState$.subscribe((abouts) => this.abouts = abouts);
		this.footerService.socialsState$.subscribe((socials) => this.socials = socials);
	}

	ngOnInit() { }

	popupSitemap() {
	}

	popupPersonalitySelector() {
	}
}
