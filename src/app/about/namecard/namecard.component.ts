import { Component, Input } from "@angular/core";

import { AvatarInput } from "./namecard.interface";

// TODO: Improve the placeholder styling

@Component({
	selector: "app-namecard",
	styleUrls: [ "./namecard.component.scss" ],
	templateUrl: "./namecard.component.html",
})
export class NamecardComponent {
	@Input() public readonly avatar: AvatarInput;
	@Input() public readonly description: string;
	@Input() public readonly link: string;
	@Input() public readonly name: string;
}
