import type { AfterViewInit } from "@angular/core";
import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appHeaderOffset]",
})
export class HeaderOffsetDirective implements AfterViewInit {
	@Input() private readonly deepTargets: string[] = [];

	private readonly targetElement: ElementRef<HTMLElement>;

	private headerOffsetContents(pageElements: HTMLElement[]): void {
		// TODO: Fetch shrink-header size from globals.
		const shrinkHeaderSize = getComputedStyle(document.body).getPropertyValue("--shrink-header-size-em");

		// TODO: Add existing top and height values to new computed ones instead of replacing.

		pageElements.forEach((contentElement: HTMLElement) => {
			this.renderer.setStyle(contentElement, "top", shrinkHeaderSize);
			this.renderer.setStyle(contentElement, "height", `calc(100% - ${shrinkHeaderSize})`);
		});
	}

	constructor(
			private readonly elementReference: ElementRef<HTMLElement>,
			private readonly renderer: Renderer2,
	) {
		this.targetElement = this.elementReference;
	}

	ngAfterViewInit() {
		const targetElements: HTMLElement[] = Boolean(this.deepTargets.length)
			? this.deepTargets
				.map(
					(targetSelector: string) => this.targetElement.nativeElement.querySelector(targetSelector),
				)
				.filter(Boolean)
				.map((element: Element) => element as HTMLElement)
			: [ this.targetElement.nativeElement ];

		this.headerOffsetContents(targetElements);
	}
}
