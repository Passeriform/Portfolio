import { Component, Input } from "@angular/core";
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from "@angular/common";

import { Position } from "@shared/models/cardinals.interface";
import { WikiPipe } from "@shared/pipes/wiki.pipe";
import { UnionArrayPipe } from "@shared/pipes/union-array.pipe";
import { IconUriPipe } from "@shared/pipes/icon-uri.pipe";
import { TooltipDirective } from "@shared/tooltip/directives/tooltip.directive";
import { CageGridDirective } from "@shared/cage-grid/directives/cage-grid.directive";
import { CageGridComponent } from "@shared/cage-grid/cage-grid.component";

import { TechStackModel } from "./tech-stack.interface";

@Component({
	imports: [
		AsyncPipe,
		CageGridComponent,
		CageGridDirective,
		IconUriPipe,
		KeyValuePipe,
		NgFor,
		NgIf,
		TooltipDirective,
		UnionArrayPipe,
		WikiPipe,
	],
	selector: "app-tech-stack",
	standalone: true,
	styleUrls: [ "./tech-stack.component.scss" ],
	templateUrl: "./tech-stack.component.html",
})
export class TechStackComponent {
	public readonly Position = Position;

	@Input() public readonly model: TechStackModel;
}
