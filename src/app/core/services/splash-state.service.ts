import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

export enum SplashState {
	Focussed,
	Blurred,
}

@Injectable()
export class SplashStateService {
	private splashStateSource = new BehaviorSubject<SplashState>(SplashState.Focussed);

	splashState$: Observable<SplashState> = this.splashStateSource.asObservable();

	changeSplashState(splashState: SplashState): void {
		this.splashStateSource.next(splashState);
	}
}
