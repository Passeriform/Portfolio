import { Component, AfterContentInit, QueryList, ContentChildren } from '@angular/core';

import { CageGridDirective } from './cage-grid.directive';

@Component({
  selector: 'app-cage-grid',
  templateUrl: './cage-grid.component.html',
  styleUrls: ['./cage-grid.component.sass']
})
export class CageGridComponent implements AfterContentInit {
  @ContentChildren(CageGridDirective) cagedList: QueryList<CageGridDirective>;

  constructor() {
  }

  ngAfterContentInit() {
  }
}
