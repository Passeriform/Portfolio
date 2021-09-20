import { Component, ContentChildren, Input } from "@angular/core";
import type { AfterContentInit, ElementRef, QueryList } from "@angular/core";
import type { SafeStyle } from "@angular/platform-browser";
import { DomSanitizer } from "@angular/platform-browser";

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

	constructor(private readonly sanitizer: DomSanitizer) {
		interval(this.delay).subscribe(() => {
			if (this.auto) {
				this.inViewIndex = (this.inViewIndex + 1) % this.swipeList.length;
			}
		});
	}

	ngAfterContentInit() {
		// ngAfterContentInit
	}

	// TODO: Revamp using renderer2

	public get swipeTranform(): SafeStyle {
		const factor: number = 100 / this.swipeList.length;
		const styleString = `translateY(-${factor * this.inViewIndex}%) translateY(-0.5em)`;

		return this.sanitizer.bypassSecurityTrustStyle(styleString);
	}
}
