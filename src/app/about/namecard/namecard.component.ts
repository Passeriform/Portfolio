import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

import { AvatarInput } from "./namecard.interface";

// TODO: Improve the placeholder styling

@Component({
	imports: [
		NgIf,
		RouterLink,
	],
	selector: "app-namecard",
	standalone: true,
	styleUrls: [ "./namecard.component.scss" ],
	templateUrl: "./namecard.component.html",
})
export class NamecardComponent {
	@Input() public readonly avatar: AvatarInput;
	@Input() public readonly description: string;
	@Input() public readonly link: string;
	@Input() public readonly name: string;
}
