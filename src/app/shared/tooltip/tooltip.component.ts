import type { ElementRef, OnDestroy, TemplateRef } from "@angular/core";
import { Component, HostBinding, HostListener, Input } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { TooltipService } from "./services/tooltip.service";
import type { TooltipTemplateConfig } from "./tooltip.interface";

@Component({
	selector: "app-tooltip",
	styleUrls: [ "./tooltip.component.scss" ],
	templateUrl: "./tooltip.component.html",
})
export class TooltipComponent implements OnDestroy {
	private hoveringSelf: boolean;
	private hoveringTrigger: boolean;

	public contentPadding: boolean;

	@Input() public invert: boolean;
	@Input() public position: Position;
	@Input() public tooltipTemplate: TemplateRef<ElementRef> | undefined;

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

	@HostBinding("class.corner") public corner: boolean;

	@HostBinding("class.show")
	public get showToggle(): boolean {
		return this.hoveringTrigger || this.hoveringSelf;
	}

	@HostListener("focusout")
	@HostListener("mouseleave")
	public onBlur(): void {
		this.hoveringSelf = false;
	}

	@HostListener("focusin", [ "$event" ])
	@HostListener("mouseenter", [ "$event" ])
	public onFocus(): void {
		this.hoveringSelf = true;
	}

	constructor(private readonly tooltipService: TooltipService) {
		this.tooltipService.templateConfigState$.subscribe((config: TooltipTemplateConfig) => {
			const { contentPadding, corner, invert, left, position, show, template, top } = config;

			Object.assign(this, { contentPadding, corner, invert, position });

			this.tooltipTemplate = template;
			this.hoveringTrigger = show;

			document.documentElement.style.setProperty("--tooltip-top", `${top}px`);
			document.documentElement.style.setProperty("--tooltip-left", `${left}px`);
		});
	}

	ngOnDestroy() {
		// TODO: Also destroy when changing routes.
		this.tooltipService.setTemplateConfig$({ show: false });
	}
}
