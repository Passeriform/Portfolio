import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass']
})
export class TabComponent implements AfterContentInit {

  @Input() href: string;

  constructor() { }

  ngAfterContentInit() {
  }

}
