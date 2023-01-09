import type { AfterViewInit, OnChanges } from "@angular/core";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { Constants } from "./page-nav.config";
import type { PageNavChanges } from "./page-nav.interface";

@Component({
	selector: "app-page-nav",
	styleUrls: [ "./page-nav.component.scss" ],
	templateUrl: "./page-nav.component.html",
})
export class PageNavComponent implements AfterViewInit, OnChanges {
	@Input() public readonly items: QueryList<ElementRef>;
	@Input() public readonly apparentTravelFactor: number;
	@Input() public readonly position: Position = Position.LEFT;
	@Input() public readonly activePage: number = Constants.INITIAL_ACTIVE_PAGE;
	@Input() public readonly discrete: boolean = true;
	@Input() public readonly invert: boolean = false;
	@Input() public readonly keepExpanded: boolean = false;
	@Input() public expanded = false;

	@HostListener("document:touchstart", [ "$event" ])
	public onTouchstart(event: TouchEvent): void {
		if (event.target instanceof Element) {
			this.expanded = this.elementReference.nativeElement.contains(event.target);
		}
	}

	@HostBinding("class")
	public get positionClass(): string {
		const positionClasses: Record<Position, string> = {
			[Position.TOP]: "top",
			[Position.RIGHT]: "right",
			[Position.BOTTOM]: "bottom",
			[Position.LEFT]: "left",
		};

		return positionClasses[this.position];
	}

	@HostBinding("class.continuous")
	public get isContinuous(): boolean {
		return !this.discrete;
	}

	@HostBinding("class.discrete")
	public get isDiscrete(): boolean {
		return this.discrete;
	}

	@HostBinding("class.expanded")
	public get isExpanded(): boolean {
		return this.keepExpanded || this.expanded;
	}

	@HostBinding("class.inverted")
	public get isInverted(): boolean {
		return this.invert;
	}

	@Output() public readonly setActivePage: EventEmitter<number> = new EventEmitter<number>();

	constructor(private readonly elementReference: ElementRef<HTMLElement>) { }

	private updateTravellerPosition(index: number): void {
		this.elementReference.nativeElement.style.setProperty("--traveller-offset", `${index}`);
	}

	ngAfterViewInit() {
		this.updateTravellerPosition(this.activePage);
	}

	ngOnChanges(changes: PageNavChanges) {
		if (changes.items) {
			this.elementReference.nativeElement.style.setProperty("--item-step-count", `${this.items.length}`);
		}

		if (Boolean(changes.activePage)) {
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
