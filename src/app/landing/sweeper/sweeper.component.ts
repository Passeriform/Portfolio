import type { AfterContentInit } from "@angular/core";
import { Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChild } from "@angular/core";

import { filter, interval } from "rxjs";

import { Constants } from "./sweeper.config";

@Component({
	selector: "app-sweeper",
	standalone: true,
	styleUrls: [ "./sweeper.component.scss" ],
	templateUrl: "./sweeper.component.html",
})
export class SweeperComponent implements AfterContentInit {
	private inViewIndex = 0;

	@Input() public readonly auto: boolean;
	@Input() public readonly delay: number = Constants.INITIAL_DELAY;
	@Input() public readonly leading: string;

	@ViewChild("leadingText", { read: ElementRef, static: true }) public readonly leadingSpan: ElementRef<HTMLElement>;
	@ViewChild("sweepContainer", { read: ElementRef, static: true }) public readonly sweepContainer: ElementRef<HTMLElement>;
	@ContentChildren("sweepable", { descendants: false, read: ElementRef }) public readonly swipeList: QueryList<ElementRef<HTMLElement>>;

	@HostListener("window:resize")
	public onResize(): void {
		this.recalculateAccentWidth();
	}

	constructor(private readonly hostElement: ElementRef<HTMLElement>) { }

	public cycleNext(): void {
		this.sweepContainer.nativeElement.style.setProperty(
			"transform",
			`translateY(-${(this.inViewIndex / this.swipeList.length) * 100}%)`,
		);
	}

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

	// eslint-disable-next-line @typescript-eslint/member-ordering
	ngAfterContentInit() {
		this.recalculateAccentWidth();

		interval(this.delay)
			.pipe(filter(() => this.auto))
			.subscribe(() => {
				this.inViewIndex = (this.inViewIndex + 1) % this.swipeList.length;
				this.cycleNext();
				this.recalculateAccentWidth();
			});
	}
}
