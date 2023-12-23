import type { ElementRef, TemplateRef } from "@angular/core";
import { Directive, HostListener, Input } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { TooltipService } from "../services/tooltip.service";

@Directive({
	selector: "[appTooltip]",
	standalone: true,
})
export class TooltipDirective {
	@Input() public readonly contentPadding: boolean = true;
	@Input() public readonly corner: boolean = false;
	@Input() public readonly invert: boolean = false;
	@Input() public readonly position: Position = Position.BOTTOM;
	@Input() public readonly template: TemplateRef<ElementRef> | undefined;

	@HostListener("focusout")
	@HostListener("mouseleave")
	public onBlur(): void {
		this.tooltipService.setTemplateConfig$({ show: false });
	}

	@HostListener("focusin", [ "$event" ])
	@HostListener("mouseenter", [ "$event" ])
	public onFocus(event: FocusEvent | MouseEvent): void {
		const boundingRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		this.tooltipService.setTemplateConfig$({
			contentPadding: this.contentPadding,
			corner: this.corner,
			invert: this.invert,
			left: boundingRect.left + (boundingRect.width / 2),
			position: this.position,
			show: true,
			template: this.template,
			top: boundingRect.top + (boundingRect.height / 2),
		});
	}

	constructor(private readonly tooltipService: TooltipService) { }
}
