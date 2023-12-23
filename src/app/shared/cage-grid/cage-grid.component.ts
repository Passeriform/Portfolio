import { CommonModule } from "@angular/common";
import type { AfterViewInit } from "@angular/core";
import { Component, ContentChildren, QueryList } from "@angular/core";

import { CageGridDirective } from "./directives/cage-grid.directive";

@Component({
	imports: [ CommonModule ],
	selector: "app-cage-grid",
	standalone: true,
	styleUrls: [ "./cage-grid.component.scss" ],
	templateUrl: "./cage-grid.component.html",
})
export class CageGridComponent implements AfterViewInit {
	@ContentChildren(CageGridDirective, { descendants: true }) public readonly cagedList: QueryList<CageGridDirective>;

	ngAfterViewInit() {
		// ngAfterViewInit
	}
}
