import { Component, Input } from "@angular/core";

import type { LinkModel } from "@shared/models/link.interface";

@Component({
	selector: "app-social-glyphs",
	styleUrls: [ "./social-glyphs.component.scss" ],
	templateUrl: "./social-glyphs.component.html",
})
export class SocialGlyphsComponent {
	// TODO: Add dynamic palette support
	@Input() public readonly model: readonly LinkModel[];
	@Input() public readonly invert = false;
}
