import { NgClass, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
	imports: [
		NgClass,
		NgIf,
	],
	selector: "app-raisecard",
	standalone: true,
	styleUrls: [ "./raisecard.component.scss" ],
	templateUrl: "./raisecard.component.html",
})
export class RaisecardComponent {
	@Input() public readonly marker: string;
	@Input() public readonly title: string;
}
