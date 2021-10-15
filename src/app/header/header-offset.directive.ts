import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appHeaderOffset]",
})
export class HeaderOffsetDirective implements AfterViewInit {
	@Input() private readonly deepTargets: string[];

	private readonly targetElement: ElementRef<HTMLElement>;

	constructor(
			private readonly elementReference: ElementRef<HTMLElement>,
			private readonly renderer: Renderer2,
	) {
		this.targetElement = this.elementReference;
	}

	ngAfterViewInit() {
		const targetElements: HTMLElement[] = this.deepTargets
			? this.deepTargets
				.map(
					(targetSelector: string) => this.targetElement.nativeElement.querySelector(targetSelector),
				)
				.filter(
					(targetElement: HTMLElement | null): targetElement is HTMLElement => targetElement !== null,
				)
			: [ this.targetElement.nativeElement ];

		headerOffsetContents(targetElements, this.renderer);
	}
}

export const headerOffsetContents = (
		pageElements: HTMLElement[],
		renderer: Renderer2,
): void => {
	// TODO: Fetch shrink-header size from globals
	const shrinkHeaderSize = getComputedStyle(document.body).getPropertyValue("--shrink-header-size-em");

	pageElements.forEach((contentElement: HTMLElement) => {
		renderer.setStyle(contentElement, "top", shrinkHeaderSize);
		renderer.setStyle(contentElement, "height", `calc(100% - ${shrinkHeaderSize})`);
	});
};
