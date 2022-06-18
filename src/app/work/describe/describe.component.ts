import type { OnInit } from "@angular/core";
import { Component, Input } from "@angular/core";

import type { WorkDescriptionModel } from "../work.interface";

@Component({
	selector: "app-describe",
	styleUrls: [ "./describe.component.scss" ],
	templateUrl: "./describe.component.html",
})
export class DescribeComponent implements OnInit {
	@Input() public readonly model: WorkDescriptionModel;

	ngOnInit() {
		// ngOnInit
	}
}
