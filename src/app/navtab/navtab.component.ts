import { Component, HostBinding, OnInit, ContentChildren, QueryList } from '@angular/core';

import { NavtabDirective } from './navtab.directive';

import { SplashState, SplashStateService } from '../services/splash-state.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.component.html',
  styleUrls: ['./navtab.component.sass']
})
export class NavtabComponent implements OnInit {
  @ContentChildren(NavtabDirective) navtabItems: QueryList<NavtabDirective>;

  public splashState: SplashState;

  @HostBinding('class.logo-shrink-fix') public shrinkFix: boolean;

  constructor(private splashStateService: SplashStateService) { }

  ngOnInit() {
    this.splashStateService.splashState$.subscribe(
      splashState => {
        this.splashState = splashState;
        this.shrinkFix = splashState !== SplashState.Focussed;
      });
  }

  propagateClick(event: MouseEvent | TouchEvent): void {
    const target = (
      event.target ??
        event.srcElement ??
          event.currentTarget
    ) as HTMLElement;

    for (const child of target.children) { (child as HTMLElement).click(); }
  }
}
