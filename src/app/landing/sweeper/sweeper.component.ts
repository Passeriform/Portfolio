import type { AfterContentInit, ElementRef, QueryList } from "@angular/core";
import { Component, ContentChildren, HostBinding, Input } from "@angular/core";

import { interval } from "rxjs";

import { Constants } from "./sweeper.config";

@Component({
	selector: "app-sweeper",
	styleUrls: [ "./sweeper.component.scss" ],
	templateUrl: "./sweeper.component.html",
})
export class SweeperComponent implements AfterContentInit {
	@Input() public readonly leading: boolean;
	@Input() public readonly auto: boolean;
	@Input() public readonly delay: number = Constants.INITIAL_DELAY;

	// TODO: Add read argument

	@ContentChildren("sweepable") public readonly swipeList: QueryList<ElementRef<HTMLElement>>;

	private inViewIndex = 0;

	public get sweepTransform(): string {
		const factor: number = 100 / this.swipeList.length;
		return `translateY(-${factor * this.inViewIndex}%) translateY(-0.5em)`;
	}

	ngAfterContentInit() {
		interval(this.delay).subscribe(() => {
			if (this.auto) {
				this.inViewIndex = (this.inViewIndex + 1) % this.swipeList.length;
			}
		});
	}
}
