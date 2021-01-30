import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export enum SplashState {
  Focussed,
  Blurred
}

@Injectable()
export class SplashStateService {
  private splashStateSource = new BehaviorSubject<SplashState>(SplashState.Focussed);

  splashState$ = this.splashStateSource.asObservable();

  changeSplashState(splashState: SplashState) {
    this.splashStateSource.next(splashState);
  }
}
