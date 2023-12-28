import { Component, Input } from "@angular/core";
import { NgIf } from "@angular/common";

import { WorkDescriptionModel } from "./describe.interface";

@Component({
	imports: [ NgIf ],
	selector: "app-describe",
	standalone: true,
	styleUrls: [ "./describe.component.scss" ],
	templateUrl: "./describe.component.html",
})
export class DescribeComponent {
	@Input() public readonly model: WorkDescriptionModel;
}
