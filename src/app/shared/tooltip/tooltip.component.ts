import type { AfterViewInit, OnInit, TemplateRef } from "@angular/core";
import { Component, HostBinding, Input, Renderer2, ElementRef } from "@angular/core";

import type { Observable } from "rxjs";

import { TooltipService } from "./tooltip.service";

@Component({
	selector: "app-tooltip",
	styleUrls: [ "./tooltip.component.scss" ],
	templateUrl: "./tooltip.component.html",
})
export class TooltipComponent implements OnInit {
	@Input() public positionType: string;
	@Input() public invert: boolean;
	@Input() public tooltipTemplate: TemplateRef<any>;

	@HostBinding("class.show") public showToggle: boolean;

	@HostBinding("class.top")
	public get isTop(): boolean {
		return this.positionType === "top";
	}

	@HostBinding("class.bottom")
	public get isBottom(): boolean {
		return this.positionType === "bottom";
	}

	constructor(
		private readonly renderer: Renderer2,
		private readonly elementReference: ElementRef,
		private readonly tooltipService: TooltipService,
	) { }

	ngOnInit() {
		this.tooltipService.showTooltipState$.subscribe((toggle: boolean) => {
			this.showToggle = toggle;
		});
		this.tooltipService.templateState$.subscribe((template: TemplateRef<any>) => {
			this.tooltipTemplate = template;
		});
		this.tooltipService.positionState$.subscribe(([top, left]: [top: number, left: number]) => {
			this.renderer.setStyle(this.elementReference.nativeElement, "top", `${top}px`);
			this.renderer.setStyle(this.elementReference.nativeElement, "left", `${left}px`);
		})
	}
}
