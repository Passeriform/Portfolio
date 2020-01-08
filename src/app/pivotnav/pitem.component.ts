import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'p-item',
  templateUrl: './pitem.component.html',
  styleUrls: ['./pitem.component.sass']
})
export class PItemComponent implements AfterContentInit{

  @Input() href: string;
  @Input() srclogo: string;

  ngAfterContentInit() {
  }
}
