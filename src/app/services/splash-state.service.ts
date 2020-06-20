import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SplashStateService {
  private splashStateSource = new BehaviorSubject<string>('focussed');

  splashState$ = this.splashStateSource.asObservable();

  changeSplashState(splashState: string) {
    this.splashStateSource.next(splashState);
  }
}
