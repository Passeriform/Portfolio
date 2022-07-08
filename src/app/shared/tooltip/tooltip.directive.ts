import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { TooltipService } from "./tooltip.service";

@Directive({
	selector: "[appTooltip]",
})
export class TooltipDirective {
	@ViewChild(TemplateRef, { read: ViewContainerRef }) private readonly viewContainer: ViewContainerRef;

	@Input() public readonly invert = false;
	@Input() public readonly position = Position.BOTTOM;
	@Input() public readonly corner = false;
	@Input() public readonly template: TemplateRef<ElementRef>;

	@HostListener("focusin", [ "$event" ])
	@HostListener("mouseenter", [ "$event" ])
	public showTooltip(event: FocusEvent | MouseEvent): void {
		const boundingRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		this.tooltipService.setTemplate$(this.template);
		this.tooltipService.setPosition$(this.position);
		this.tooltipService.setCorner$(this.corner);
		this.tooltipService.setInvert$(this.invert);
		/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
		this.tooltipService.setOffset$([
			boundingRect.top + (boundingRect.height / 2),
			boundingRect.left + (boundingRect.width / 2),
		]);
		this.tooltipService.setShowTooltip$(true);
	}

	@HostListener("focusout")
	@HostListener("mouseleave")
	public hideTooltip(): void {
		this.tooltipService.setShowTooltip$(false);
	}

	constructor(private readonly tooltipService: TooltipService) { }
}
