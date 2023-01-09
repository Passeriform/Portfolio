import type { AfterViewInit } from "@angular/core";
import { Component, ContentChildren, QueryList } from "@angular/core";

import { CageGridDirective } from "./directives/cage-grid.directive";

@Component({
	selector: "app-cage-grid",
	styleUrls: [ "./cage-grid.component.scss" ],
	templateUrl: "./cage-grid.component.html",
})
export class CageGridComponent implements AfterViewInit {
	@ContentChildren(CageGridDirective, { descendants: true }) public readonly cagedList: QueryList<CageGridDirective>;

	ngAfterViewInit() {
		// ngAfterViewInit
	}
}
