import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-raisecard',
  templateUrl: './raisecard.component.html',
  styleUrls: ['./raisecard.component.sass']
})
export class RaisecardComponent {
  @Input() title: string;
  @Input() marker: string;

  constructor() { }
}
