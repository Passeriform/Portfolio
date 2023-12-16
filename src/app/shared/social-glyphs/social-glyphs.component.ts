import { Component, Input } from "@angular/core";

import { registry } from "@shared/models/registry.interface";

import type { SocialGlyphModel } from "./social-glyphs.interface";

@Component({
	selector: "app-social-glyphs",
	styleUrls: [ "./social-glyphs.component.scss" ],
	templateUrl: "./social-glyphs.component.html",
})
export class SocialGlyphsComponent {
	public registry = registry;

	// TODO: Add dynamic palette support
	@Input() public readonly invert: boolean = false;
	@Input() public readonly model: readonly SocialGlyphModel[];
}
