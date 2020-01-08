import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './raisecard.component.html',
  styleUrls: ['./raisecard.component.sass']
})
export class RaisecardComponent {

  @Input() focussed = false;
  @Input() title: string;
  @Input() index: number;
  @Output() toggle: EventEmitter<any>;

  private focusIndex = 0;

  constructor() { this.toggle = new EventEmitter<any>(); }

  handleClick() {
    this.focussed = !this.focussed;
    this.toggle.emit();
  }
}
