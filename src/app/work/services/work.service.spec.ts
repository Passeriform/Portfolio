import { TestBed } from "@angular/core/testing";

import { WorkService } from "./work.service";

describe("WorkService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: WorkService = TestBed.inject(WorkService);
		expect(service).toBeTruthy();
	});
});
