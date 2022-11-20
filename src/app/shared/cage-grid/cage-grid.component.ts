import type { AfterViewInit, QueryList } from "@angular/core";
import { Component, ContentChildren } from "@angular/core";

import { CageGridDirective } from "./cage-grid.directive";

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
