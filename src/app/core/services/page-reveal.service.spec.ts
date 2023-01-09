import { TestBed } from "@angular/core/testing";

import { PageRevealService } from "./page-reveal.service";

describe("PageEndRevealService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: PageRevealService = TestBed.inject(PageRevealService);
		expect(service).toBeTruthy();
	});
});
