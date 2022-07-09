import { Component, Input } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

@Component({
	selector: "app-tech-stack",
	styleUrls: [ "./tech-stack.component.scss" ],
	templateUrl: "./tech-stack.component.html",
})
export class TechStackComponent {
	public readonly Position = Position;

	@Input() public readonly model: readonly Record<string, unknown>[];

	public readonly tooltipShownFor: string;
}
