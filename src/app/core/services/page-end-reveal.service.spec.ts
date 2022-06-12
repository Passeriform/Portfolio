import { TestBed } from "@angular/core/testing";

import { PageEndRevealService } from "./services/page-end-reveal.service";

describe("PageEndRevealService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: PageEndRevealService = TestBed.get(PageEndRevealService);
		expect(service).toBeTruthy();
	});
});
