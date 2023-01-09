import { TestBed } from "@angular/core/testing";

import { SplashStateService } from "./services/splash-state.service";

describe("SplashStateService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: SplashStateService = TestBed.inject(SplashStateService);
		expect(service).toBeTruthy();
	});
});
