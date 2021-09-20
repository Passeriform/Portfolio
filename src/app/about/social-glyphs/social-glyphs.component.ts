import { Component, Input } from "@angular/core";
import type { OnInit } from "@angular/core";

import type { LinkModel } from "@shared/models/link.interface";

// TODO: Move to SharedModule instead

@Component({
	selector: "app-social-glyphs",
	styleUrls: [ "./social-glyphs.component.scss" ],
	templateUrl: "./social-glyphs.component.html",
})
export class SocialGlyphsComponent implements OnInit {
	@Input() public readonly model: readonly LinkModel[];

	// TODO: Add dynamic palette support

	@Input() public readonly invert = false;

	ngOnInit() {
		// ngOnInit
	}
}
