import { Component, Input } from "@angular/core";

// TODO: Improve the placeholder styling

@Component({
	selector: "app-namecard",
	styleUrls: [ "./namecard.component.scss" ],
	templateUrl: "./namecard.component.html",
})
export class NamecardComponent {
	@Input() public readonly avatarHref;
	@Input() public readonly avatarLink;
	@Input() public readonly description;
	@Input() public readonly imgUrl;
	@Input() public readonly imgAlt;
	@Input() public readonly name;
}
