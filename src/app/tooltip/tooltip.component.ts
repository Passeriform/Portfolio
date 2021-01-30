import { Component, OnInit, AfterViewInit, Input, HostBinding, TemplateRef } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
export class TooltipComponent implements OnInit, AfterViewInit {
  @HostBinding('class.show') showToggle: boolean;

  // TODO: Rename to palette and infer colors
  @Input() positionType: string;
  @Input() palette: {primaryColor: string, accentColor: string};
  @Input() callerInstance: any;
  @Input() showObs: Observable<boolean>;
  @Input() public tooltipTemplate: TemplateRef<any>;

  @HostBinding('class.top')
  get isTop() {
    return this.positionType  === 'top';
  }

  @HostBinding('class.bottom')
  get isBottom() {
    return this.positionType  === 'bottom';
  }

  @HostBinding('style.top.px')
  get topFix() {
    return this.callerInstance.getBoundingClientRect().top + this.callerInstance.getBoundingClientRect().height / 2;
  }

  @HostBinding('style.left.px')
  get leftFix() {
    return this.callerInstance.getBoundingClientRect().left + this.callerInstance.getBoundingClientRect().width / 2;
  }

  constructor() { }

  ngOnInit() {
    this.showObs.subscribe((toggle) => {
      this.showToggle = toggle;
    });
  }

  ngAfterViewInit() { }
}
