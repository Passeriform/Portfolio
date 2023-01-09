import { TestBed } from "@angular/core/testing";

import { CanvasService } from "./canvas.service";

describe("CanvasService", () => {
	beforeEach(() => TestBed.configureTestingModule({ }));

	it("should be created", () => {
		const service: CanvasService = TestBed.inject(CanvasService);
		expect(service).toBeTruthy();
	});
});
