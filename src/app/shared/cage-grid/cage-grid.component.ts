import { NgClass, NgFor, NgTemplateOutlet } from "@angular/common";
import { Component, ContentChildren, QueryList } from "@angular/core";

import { CageGridDirective } from "./directives/cage-grid.directive";

@Component({
	imports: [
		NgClass,
		NgFor,
		NgTemplateOutlet,
	],
	selector: "app-cage-grid",
	standalone: true,
	styleUrls: [ "./cage-grid.component.scss" ],
	templateUrl: "./cage-grid.component.html",
})
export class CageGridComponent {
	@ContentChildren(CageGridDirective, { descendants: true }) public readonly cages: QueryList<CageGridDirective>;
}
