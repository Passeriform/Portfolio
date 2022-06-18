import type { ElementRef, OnChanges, QueryList, SimpleChanges } from "@angular/core";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-page-nav",
	styleUrls: [ "./page-nav.component.scss" ],
	templateUrl: "./page-nav.component.html",
})
export class PageNavComponent implements OnChanges {
	private currentPageIndex: number;

	@Input() public readonly pages: QueryList<ElementRef>;
	@Input() public readonly activePage: number;

	@Output() public readonly setActivePage: EventEmitter<number> = new EventEmitter<number>();

	private updateTravellerPosition(index: number): void {
		document.documentElement.style.setProperty("--traveller-top", `${index}`);
	}

	// TODO: Remove all DOM manipulations and use css variable manipulation instead

	ngOnChanges(changes: SimpleChanges) {
		if (changes.activePage) {
      this.updateTravellerPosition(this.activePage)
	  }
	}

	public switchToPage(pageIndex: number): void {
		this.setActivePage.next(pageIndex);
	}
}
