import type { ElementRef, OnInit, TemplateRef } from "@angular/core";
import { Component, HostBinding, Input } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import { TooltipService } from "./tooltip.service";

@Component({
	selector: "app-tooltip",
	styleUrls: [ "./tooltip.component.scss" ],
	templateUrl: "./tooltip.component.html",
})
export class TooltipComponent implements OnInit {
	@Input() public position: Position;
	@Input() public invert: boolean;
	@Input() public tooltipTemplate: TemplateRef<ElementRef>;

	@HostBinding("class") public get positionClass(): string {
		const positionClasses: Record<Position, string> = {
			[Position.TOP]: "top",
			[Position.RIGHT]: "right",
			[Position.BOTTOM]: "bottom",
			[Position.LEFT]: "left",
		}

		return positionClasses[this.position];
	}

	@HostBinding("class.show") public showToggle: boolean;

	constructor(private readonly tooltipService: TooltipService) { }

	ngOnInit() {
		this.tooltipService.showTooltipState$.subscribe((toggle: boolean) => {
			this.showToggle = toggle;
		});
		this.tooltipService.templateState$.subscribe((template: TemplateRef<ElementRef>) => {
			this.tooltipTemplate = template;
		});
		this.tooltipService.positionState$.subscribe((position: Position) => {
			this.position = position;
		});
		this.tooltipService.invertState$.subscribe((invert: boolean) => {
			this.invert = invert;
		});
		this.tooltipService.offsetState$.subscribe(([ top, left ]: [ number, number ]) => {
			document.documentElement.style.setProperty("--tooltip-top", `${top}px`);
			document.documentElement.style.setProperty("--tooltip-left", `${left}px`);
		});
	}
}
