import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostListener, Injector, Input, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import type { AfterViewInit, ComponentRef, EmbeddedViewRef, OnDestroy } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { TooltipComponent } from "./tooltip.component";
import { TooltipService } from "./tooltip.service";

@Directive({
	selector: "[appTooltip]",
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
	@ViewChild(TemplateRef, { read: ViewContainerRef }) private readonly viewContainer: ViewContainerRef;

	@Input() public readonly position = "bottom";
	@Input() public readonly template: TemplateRef<any>;
	@Input() public invert: boolean;

	private componentRef: ComponentRef<any>;
	private componentInstance: TooltipComponent;

	@HostListener("focusin", ["$event"])
	@HostListener("mouseover", ["$event"])
	public showTooltip(event: FocusEvent | MouseEvent): void {
		const boundingRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
		this.tooltipService.setTemplate$(this.template);
		/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
		this.tooltipService.setPosition$([
			boundingRect.top + (boundingRect.height / 2),
			boundingRect.left + (boundingRect.width / 2),
		]);
		this.tooltipService.setShowTooltip$(true);
	}

	@HostListener("focusout")
	@HostListener("mouseout")
	public hideTooltip(): void {
		this.tooltipService.setShowTooltip$(false);
	}

	constructor(
			private readonly elementReference: ElementRef,
			private readonly appReference: ApplicationRef,
			private readonly injector: Injector,
			private readonly componentFactoryResolver: ComponentFactoryResolver,
			private readonly tooltipService: TooltipService,
	) { }

	ngAfterViewInit() {
		const tooltipPortal = document.querySelector('#tooltipPortal');

		if (!tooltipPortal) {
			throw new Error(
				`Could not find target element to attach tooltips.
				Create one with #tooltipPortal id to continue using tooltip`
			)
		}

		this.componentRef = this.componentFactoryResolver
			.resolveComponentFactory(TooltipComponent)
			.create(this.injector, [], tooltipPortal);

		this.componentInstance = this.componentRef.instance as TooltipComponent;
		this.componentInstance.positionType = this.position;
		this.componentInstance.invert = this.invert;
		this.appReference.attachView(this.componentRef.hostView);
	}

	ngOnDestroy() {
		this.tooltipService.setShowTooltip$(false);
	}
}
