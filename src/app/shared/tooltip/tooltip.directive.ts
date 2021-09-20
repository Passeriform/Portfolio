import { Directive, HostListener, Input, TemplateRef, ViewChild, ViewContainerRef, ElementRef, ApplicationRef, Injector, ComponentFactoryResolver } from "@angular/core";
import type { AfterViewInit, OnDestroy, ComponentRef, EmbeddedViewRef } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { TooltipComponent } from "./tooltip.component";

@Directive({
	selector: "[appTooltip]",
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
	@ViewChild(TemplateRef, { read: ViewContainerRef }) private readonly viewContainer: ViewContainerRef;

	@Input() public readonly position = "bottom";

	@Input() public readonly template: TemplateRef<any>;

	@Input() public darkMode: boolean;

	private componentRef: ComponentRef<any>;

	private readonly showTooltip$ = new BehaviorSubject<boolean>(false);

	@HostListener("focusin")
	@HostListener("mouseover")
	public showTooltip(): void {
		this.showTooltip$.next(true);
	}

	@HostListener("focusout")
	@HostListener("mouseout")
	public hideTooltip(): void {
		this.showTooltip$.next(false);
	}

	constructor(
			private readonly elementReference: ElementRef,
			private readonly appReference: ApplicationRef,
			private readonly injector: Injector,
			private readonly componentFactoryResolver: ComponentFactoryResolver,
	) { }

	/*
	 * NOTE: Angular only supports directives in the core, so no matter how hard
	 * the docs preach, Directives do and will support AfterViewInit hook
	 * but won"t allow it to extend. Ignoring until better solution implemented.
	 */
	ngAfterViewInit() {
		// TODO: Consider packing all tooltips in a div element and attaching more on there to keep DOM clean.

		this.componentRef = this.componentFactoryResolver
			.resolveComponentFactory(TooltipComponent)
			.create(this.injector);

		const componentInstance: TooltipComponent = this.componentRef.instance as TooltipComponent;

		componentInstance.tooltipTemplate = this.template;
		componentInstance.positionType = this.position;
		componentInstance.darkMode = this.darkMode;
		componentInstance.callerInstance = this.elementReference.nativeElement as HTMLElement;
		componentInstance.showObs$ = this.showTooltip$.asObservable();

		this.appReference.attachView(this.componentRef.hostView);

		// NOTE: Kept on top of stacking to avoid z-index collisions
		const domElement: HTMLElement = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
		document.body.append(domElement);
	}

	ngOnDestroy() {
		this.componentRef.destroy();
	}
}
