import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";

import { SplashState } from "./splash-state.interface";

@Injectable()
export class SplashStateService {
	public SplashState = SplashState;

	private readonly splashStateSource$ = new BehaviorSubject<SplashState>(SplashState.FOCUSSED);

	public readonly splashState$: Observable<SplashState> = this.splashStateSource$.asObservable();

	public changeSplashState(splashState: SplashState): void {
		this.splashStateSource$.next(splashState);
	}
}
