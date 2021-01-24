// TODO: Handle mouseover observable in directive and use component caching with destroyTimeout 

import { Directive, AfterViewInit, OnDestroy, ViewChild, EmbeddedViewRef, ElementRef, HostListener, ViewContainerRef, Injector, ApplicationRef, Input, TemplateRef, ComponentFactoryResolver } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  public showTooltip$ = new BehaviorSubject<boolean>(false);
  private componentRef: any;

  @Input() position: string = 'bottom';
  @Input() template: TemplateRef<any>;

  // TODO: Create palette service for uniform themes
  @Input() primaryColor: string;
  @Input() accentColor: string;

  @ViewChild(TemplateRef, { static: false, read: ViewContainerRef } ) viewContainer: ViewContainerRef;

  @HostListener('focusin')
  @HostListener('mouseover')
  showTooltip() { this.showTooltip$.next(true); }

  @HostListener('focusout')
  @HostListener('mouseout')
  hideTooltip() { this.showTooltip$.next(false); }

  constructor(
    private elementRef: ElementRef<any>,
    private appRef: ApplicationRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngAfterViewInit() {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(TooltipComponent)
      .create(this.injector);

    this.componentRef.instance.tooltipTemplate = this.template;
    this.componentRef.instance.positionType = this.position;
    // this.componentRef.instance.palette = {primaryColor: this.primaryColor, accentColor: this.accentColor};
    this.componentRef.instance.callerInstance = this.elementRef.nativeElement;
    this.componentRef.instance.showObs = this.showTooltip$.asObservable();

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // Kept on top of stacking to avoid z-index collisions
    document.body.appendChild(domElem);
  }
}
