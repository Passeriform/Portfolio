import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import type { SafeUrl } from "@angular/platform-browser";
import { DomSanitizer } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import type { SocialModel } from "./social-glyphs.interface";

@Component({
	imports: [
		NgClass,
		NgFor,
		NgIf,
		FontAwesomeModule,
	],
	selector: "app-social-glyphs",
	standalone: true,
	styleUrls: [ "./social-glyphs.component.scss" ],
	templateUrl: "./social-glyphs.component.html",
})
export class SocialGlyphsComponent {
	// TODO: Add dynamic palette support
	@Input() public readonly color: string;
	@Input() public readonly model: readonly SocialModel[];

	constructor(private readonly sanitizer: DomSanitizer) { }

	public recolor(url: string | undefined): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(`https://recolor-svg.vercel.app/api/${url}?color=${this.color.replace("#", "%23")}`);
	}
}
