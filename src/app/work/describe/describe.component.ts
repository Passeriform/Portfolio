import { Component, Input } from "@angular/core";

import { WorkDescriptionModel } from "./describe.interface";

@Component({
	selector: "app-describe",
	styleUrls: [ "./describe.component.scss" ],
	templateUrl: "./describe.component.html",
})
export class DescribeComponent {
	@Input() public readonly model: WorkDescriptionModel;
}
