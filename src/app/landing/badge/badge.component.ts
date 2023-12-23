import { Component, Input } from "@angular/core";

import { IconUriPipe } from "@shared/pipes/icon-uri.pipe";

@Component({
	imports: [ IconUriPipe ],
	selector: "app-badge",
	standalone: true,
	styleUrls: [ "./badge.component.scss" ],
	templateUrl: "./badge.component.html",
})
export class BadgeComponent {
	@Input() public readonly name: string;
}
