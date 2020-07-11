import { Component, HostBinding, AfterViewInit, AfterContentInit, ViewChildren, ContentChildren, QueryList } from '@angular/core';

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

  @HostBinding('class.logo-shrink-fix') shrinkFix = false;

  constructor(private splashStateService: SplashStateService) {
    splashStateService.splashState$.subscribe(
      splashState => {
        this.splashState = splashState;
        if (splashState === 'blur') {
          this.shrinkFix = true;
        } else {
          this.shrinkFix = false;
        }
      });
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  propagateClick(event: any) {
     const target = event.target || event.srcElement || event.currentTarget;

     for (const child of target.children) { child.click(); }
  }

}
