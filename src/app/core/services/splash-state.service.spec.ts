import { TestBed } from "@angular/core/testing";

import { lastValueFrom } from "rxjs";
import { reduce, take } from "rxjs/operators";

import { SplashState } from "./splash-state.interface";
import { SplashStateService } from "./splash-state.service";

describe("SplashStateService", () => {
	let service: Readonly<SplashStateService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ SplashStateService ],
		});
		service = TestBed.inject(SplashStateService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should set splash state", (done: Readonly<DoneFn>) => {
		lastValueFrom(service.splashState$.pipe(
			take(3),
			reduce((accumulator, state) => [...accumulator, state], [] as SplashState[]),
		)).then(([
			initState,
			blurredState,
			focussedState,
		]) => {
			expect(initState).toEqual(SplashState.FOCUSSED);
			expect(blurredState).toEqual(SplashState.BLURRED);
			expect(focussedState).toEqual(SplashState.FOCUSSED);
			done();
		});

		service.changeSplashState(SplashState.BLURRED);
		service.changeSplashState(SplashState.FOCUSSED);
	});
});
