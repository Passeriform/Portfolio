import { Component, Input } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { TechStackModel } from "./tech-stack.interface";

@Component({
	selector: "app-tech-stack",
	styleUrls: [ "./tech-stack.component.scss" ],
	templateUrl: "./tech-stack.component.html",
})
export class TechStackComponent {
	public readonly Position = Position;

	@Input() public readonly model: TechStackModel;
}
