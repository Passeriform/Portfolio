import { Component, Input, OnInit } from '@angular/core';

import { SplashStateService } from '../services/splash-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {

  @Input() logo: string;
  @Input() target: string;
  @Input() alt: string;
  @Input() nosplash: boolean;

  public splashState: string;

  constructor(private splashStateService: SplashStateService) {
    splashStateService.splashState$.subscribe(
      splashState => {
        this.splashState = splashState;
      });
  }

  ngOnInit() { }
}
