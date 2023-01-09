import { Component, Input } from "@angular/core";

import { AvatarImageInput, AvatarInput } from "./namecard.interface";

// TODO: Improve the placeholder styling

@Component({
	selector: "app-namecard",
	styleUrls: [ "./namecard.component.scss" ],
	templateUrl: "./namecard.component.html",
})
export class NamecardComponent {
	@Input() public readonly avatar: AvatarInput;
	@Input() public readonly avatarImage?: AvatarImageInput;
	@Input() public readonly description?: string;
	@Input() public readonly name: string;

	// TODO: Move to config file / asset registry
	public DEFAULT_AVATAR_IMAGE = "https://default.avatar.com"
}
