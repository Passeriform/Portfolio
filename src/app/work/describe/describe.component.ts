import { Component, Input } from "@angular/core";

import type { WorkDescriptionModel } from "../work.interface";

@Component({
	selector: "app-describe",
	styleUrls: [ "./describe.component.scss" ],
	templateUrl: "./describe.component.html",
})
export class DescribeComponent {
	@Input() public readonly model: WorkDescriptionModel;
}
