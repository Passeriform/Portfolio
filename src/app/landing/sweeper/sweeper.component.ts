import type { AfterContentInit } from "@angular/core";
import { Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChild } from "@angular/core";

import { filter, interval } from "rxjs";

import { Constants } from "./sweeper.config";

@Component({
	selector: "app-sweeper",
	styleUrls: ["./sweeper.component.scss"],
	templateUrl: "./sweeper.component.html",
})
export class SweeperComponent implements AfterContentInit {
	@Input() public readonly auto: boolean;
	@Input() public readonly delay: number = Constants.INITIAL_DELAY;
	@Input() public readonly leading: string;

	// TODO: Add read argument

	@ViewChild("leadingText", { static: true }) public readonly leadingSpan: ElementRef<HTMLElement>;
	@ViewChild("sweepContainer", { static: true }) public readonly sweepContainer: ElementRef<HTMLElement>;
	@ContentChildren("sweepable") public readonly swipeList: QueryList<ElementRef<HTMLElement>>;

	private inViewIndex = 0;

	@HostListener("window:resize")
	public onResize(): void {
		this.recalculateAccentWidth();
	}

	constructor(
			private readonly hostElement: ElementRef<HTMLElement>,
	) { }

	public recalculateAccentWidth(): void {
		const textWidth = this.swipeList.get(this.inViewIndex)?.nativeElement.getBoundingClientRect().width;
		const leadingWidth = this.leadingSpan.nativeElement.getBoundingClientRect().width;

		if (textWidth) {
			this.hostElement.nativeElement.style.setProperty(
				"--sweeper-highlight-text-scaling",
				`${Constants.HIGHLIGHT_PADDING_FACTOR * (textWidth + leadingWidth) / 100}`,
			);
		}
	}

	public sweepNext(): void {
		this.sweepContainer.nativeElement.style.setProperty(
			"transform",
			`translateY(-${(this.inViewIndex / this.swipeList.length) * 100}%)`,
		);
	}

	ngAfterContentInit() {
		this.recalculateAccentWidth();

		interval(this.delay)
			.pipe(filter(() => this.auto))
			.subscribe(() => {
				this.inViewIndex = (this.inViewIndex + 1) % this.swipeList.length;
				this.sweepNext();
				this.recalculateAccentWidth();
			});
	}
}
