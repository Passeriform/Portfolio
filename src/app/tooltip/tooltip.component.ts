import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass']
})
export class TooltipComponent implements OnInit {
  @Input()
  @HostBinding('class.show')
  public show = false;

  @Input() invert: boolean;
  @Input() location = 'bottom';

  @HostBinding('class.top')
  get isTop() {
    return this.location  === 'top';
  }

  constructor() { }

  ngOnInit() {
  }
}
