import {
  Directive,
  Injector,
  Input,
  ViewChild,
  HostListener,
  ComponentFactoryResolver,
  ApplicationRef,
  ElementRef,
  TemplateRef,
  ComponentRef,
  ViewContainerRef,
  EmbeddedViewRef,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  public showTooltip$ = new BehaviorSubject<boolean>(false);
  private componentRef: ComponentRef<any>;

  @Input() position = 'bottom';
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

  // NOTE: Angular only supports directives in the core, so no matter how hard
  // the docs preach, Directives do and will support AfterViewInit hook
  // but won't allow it to extend. Ignoring until better solution implemented.
  /* tslint:disable-next-line:use-lifecycle-interface */
  ngAfterViewInit() {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(TooltipComponent)
      .create(this.injector);

    this.componentRef.instance.tooltipTemplate = this.template;
    this.componentRef.instance.positionType = this.position;
    // Use a palette service instead of this.
    // this.componentRef.instance.palette = {
    //   this.primaryColor,
    //   this.accentColor
    // };
    this.componentRef.instance.callerInstance = this.elementRef.nativeElement;
    this.componentRef.instance.showObs = this.showTooltip$.asObservable();

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // NOTE: Kept on top of stacking to avoid z-index collisions
    // TODO: Consider packing all tooltips in a div element
    // and attaching more on there to keep DOM clean.
    document.body.appendChild(domElem);
  }

  /* tslint:disable-next-line:use-lifecycle-interface */
  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
