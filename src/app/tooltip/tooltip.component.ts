import { Component, OnInit, AfterViewInit, Input, HostBinding, ViewChild, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
// TODO: Remove the empty line here in all files
export class TooltipComponent implements OnInit, AfterViewInit {
  @HostBinding('class.show') showToggle: boolean

  // TODO: Rename to palette and infer colors
  @Input() positionType: string;
  @Input() palette: {primaryColor: string, accentColor: string};
  @Input() callerInstance: any;
  @Input() showObs: Observable<boolean>;
  @Input() public tooltipTemplate: TemplateRef<any>

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

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.showObs.subscribe((toggle) => {
      this.showToggle = toggle;
    });
  }

  ngAfterViewInit() { }
}
