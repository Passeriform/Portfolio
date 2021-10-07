import { Component, Input } from "@angular/core";
import type { OnInit } from "@angular/core";

// TODO: Improve the placeholder styling

@Component({
	selector: "app-namecard",
	styleUrls: [ "./namecard.component.scss" ],
	templateUrl: "./namecard.component.html",
})
export class NamecardComponent implements OnInit {
	@Input() public readonly avatarHref;
	@Input() public readonly avatarLink;
	@Input() public readonly description;
	@Input() public readonly imgUrl;
	@Input() public readonly imgAlt;
	@Input() public readonly name;

	ngOnInit() {
		// ngOnInit
	}
}
