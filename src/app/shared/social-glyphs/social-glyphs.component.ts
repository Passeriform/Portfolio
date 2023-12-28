import { NgClass, NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { registry } from "@shared/models/registry.interface";

import type { SocialGlyphModel } from "./social-glyphs.interface";

@Component({
	imports: [
		NgClass,
		NgFor,
		FontAwesomeModule,
	],
	selector: "app-social-glyphs",
	standalone: true,
	styleUrls: [ "./social-glyphs.component.scss" ],
	templateUrl: "./social-glyphs.component.html",
})
export class SocialGlyphsComponent {
	public registry = registry;

	// TODO: Add dynamic palette support
	@Input() public readonly invert: boolean = false;
	@Input() public readonly model: readonly SocialGlyphModel[];
}
