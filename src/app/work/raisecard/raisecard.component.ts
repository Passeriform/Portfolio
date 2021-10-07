import { Component, Input } from "@angular/core";

@Component({
	selector: "app-raisecard",
	styleUrls: [ "./raisecard.component.scss" ],
	templateUrl: "./raisecard.component.html",
})
export class RaisecardComponent {
	@Input() public readonly title: string;
	@Input() public readonly marker: string;
}
