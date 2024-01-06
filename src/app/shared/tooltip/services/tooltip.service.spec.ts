import { TestBed } from "@angular/core/testing";

import { TooltipService } from "./tooltip.service";

describe("TooltipService", () => {
	let service: Readonly<TooltipService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ TooltipService ],
		});
		service = TestBed.inject(TooltipService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should set tooltip config", () => {
		service.updateTemplateConfig$({ show: true });

		service.templateConfigState$.subscribe((feed) => {
			expect(feed).toEqual(jasmine.objectContaining({ show: true }));
		});
	});
});
