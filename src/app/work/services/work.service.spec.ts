import { TestBed } from "@angular/core/testing";

import { WorkService } from "./services/work.service";

describe("WorkService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: WorkService = TestBed.get(WorkService);
		expect(service).toBeTruthy();
	});
});
