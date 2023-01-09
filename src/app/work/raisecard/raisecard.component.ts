import { Component, Input } from "@angular/core";

@Component({
	selector: "app-raisecard",
	styleUrls: [ "./raisecard.component.scss" ],
	templateUrl: "./raisecard.component.html",
})
export class RaisecardComponent {
	@Input() public readonly marker: string;
	@Input() public readonly title: string;
}
