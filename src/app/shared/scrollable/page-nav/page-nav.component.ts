import type { AfterViewInit, OnChanges, QueryList, SimpleChanges } from "@angular/core";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

@Component({
	selector: "app-page-nav",
	styleUrls: [ "./page-nav.component.scss" ],
	templateUrl: "./page-nav.component.html",
})
export class PageNavComponent implements AfterViewInit, OnChanges {
	private currentPageIndex: number;

	@Input() public readonly items: QueryList<ElementRef>;
	@Input() public readonly apparentTravelFactor: number;
	@Input() public readonly position: Position = Position.LEFT;
	@Input() public readonly activePage = 0;
	@Input() public readonly discrete = true;
	@Input() public readonly invert = false;
	@Input() public readonly keepExpanded = false;
	@Input() public expanded = false;

	@HostListener("document:touchstart", ["$event"]) public touchHandler(event): void {
		this.expanded = this.elementReference.nativeElement.contains(event.target);
	}

	@HostBinding("class") public get positionClass(): string {
		const positionClasses: Record<Position, string> = {
			[Position.TOP]: "top",
			[Position.RIGHT]: "right",
			[Position.BOTTOM]: "bottom",
			[Position.LEFT]: "left",
		};

		return positionClasses[this.position];
	}

	@HostBinding("class.expanded") public get navExpanded(): boolean {
		return this.keepExpanded || this.expanded;
	}

	@HostBinding("class.inverted") public get isInverted(): boolean {
		return this.invert;
	}

	@HostBinding("class.continuous") public get isContinuous(): boolean {
		return !this.discrete;
	}

	@HostBinding("class.discrete") public get isDiscrete(): boolean {
		return this.discrete;
	}

	@Output() public readonly setActivePage: EventEmitter<number> = new EventEmitter<number>();

	private updateTravellerPosition(index: number): void {
		this.elementReference.nativeElement.style.setProperty("--traveller-offset", `${index}`);
	}

	constructor(private elementReference: ElementRef) { }

	ngAfterViewInit() {
		this.updateTravellerPosition(this.activePage);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.items) {
			this.elementReference.nativeElement.style.setProperty("--item-step-count", this.items.length);
		}

		if (changes.activePage) {
			if (this.discrete) {
				this.updateTravellerPosition(this.activePage);
			} else {
				this.updateTravellerPosition(this.activePage * this.apparentTravelFactor);
			}
		}
	}

	public switchToPage(travellerPosition: number): void {
		if (this.discrete) {
			this.setActivePage.next(travellerPosition);
		} else {
			// apparentTravelFactor = delta / fullWidth
			// traveller-offset = activePage * apparentTravelFactor
			// travellerPosition = seekbar-gutter-size * traveller-offset
			//
			// (fullWidth / seekbarTrackWidth) * (position * 1em) / delta = activePage
			// activePage = (fullWidth<ts> / seekbarTrackWidth<sass>) * (position<input> * 1em<sass>) / delta<ts>
			// activePage = (fullWidth<ts> / delta<ts>) * (1em<sass> / seekbarTrackWidth<sass>) * position<input>
			// activePage = (travellerPosition / apparentTravelFactor) * (1em<sass> / seekbarTrackWidth<sass>)
			//
			// TODO: Remove travellerTrackSize, move traveller offset into component and simplify calculation according to above
			const travellerTrackSize = (this.items.length - 1) - 2;

			this.setActivePage.next((travellerPosition / this.apparentTravelFactor) / travellerTrackSize);
		}
	}

	public setExpanded(state: boolean): void {
		this.expanded = state;
	}
}
