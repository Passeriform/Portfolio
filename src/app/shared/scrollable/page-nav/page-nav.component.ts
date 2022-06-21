import type { OnChanges, QueryList, SimpleChanges } from "@angular/core";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

@Component({
	selector: "app-page-nav",
	styleUrls: [ "./page-nav.component.scss" ],
	templateUrl: "./page-nav.component.html",
})
export class PageNavComponent implements OnChanges {
	private currentPageIndex: number;

	@Input() public readonly pages: QueryList<ElementRef>;
	@Input() public readonly activePage = 0;
	@Input() public expanded = false;

	@HostListener("document:touchstart", ["$event"]) public blur(event): void {
    if(this.elementReference.nativeElement.contains(event.target)) {
      this.expanded = true;
    } else {
			this.expanded = false;
		}
  }

	@HostBinding("class.expanded") public get navExpanded(): boolean {
		return this.expanded;
	}

	@Output() public readonly setActivePage: EventEmitter<number> = new EventEmitter<number>();

	private updateTravellerPosition(index: number): void {
		document.documentElement.style.setProperty("--traveller-top", `${index}`);
	}

	// TODO: Remove all DOM manipulations and use css variable manipulation instead

	constructor(private elementReference: ElementRef) { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.activePage) {
      this.updateTravellerPosition(this.activePage)
	  }
	}

	public switchToPage(pageIndex: number): void {
		this.setActivePage.next(pageIndex);
	}

	public setExpanded(state: boolean): void {
		this.expanded = state;
	}
}
