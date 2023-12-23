import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkDescriptionModel } from "./describe.interface";

@Component({
	imports: [ CommonModule ],
	selector: "app-describe",
	standalone: true,
	styleUrls: [ "./describe.component.scss" ],
	templateUrl: "./describe.component.html",
})
export class DescribeComponent {
	@Input() public readonly model: WorkDescriptionModel;
}
