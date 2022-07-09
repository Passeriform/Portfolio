import { Component, Input } from "@angular/core";

@Component({
	selector: "app-badge",
	styleUrls: [ "./badge.component.scss" ],
	templateUrl: "./badge.component.html",
})
export class BadgeComponent {
	@Input() public readonly name: string;
}
