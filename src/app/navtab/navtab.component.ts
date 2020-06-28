import { Component, AfterViewInit, AfterContentInit, ViewChildren, ContentChildren, QueryList } from '@angular/core';

import { NavtabDirective } from './navtab.directive';

import { SplashStateService } from '../services/splash-state.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrls: ['./navtab.component.sass']
})
export class NavtabComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(NavtabDirective) navtabItems: QueryList<NavtabDirective>;

  public splashState: string;

  constructor(private splashStateService: SplashStateService) {
    splashStateService.splashState$.subscribe(
      splashState => {
        this.splashState = splashState;
      });
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  propagateClick(event: any) {
     const target = event.target || event.srcElement || event.currentTarget;

     console.log(target.children && target.children[0] && target.children[0].click());
  }

}
