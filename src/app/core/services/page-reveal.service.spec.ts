import { TestBed } from "@angular/core/testing";

import { zip } from "rxjs";

import { PageRevealService } from "./page-reveal.service";

describe("PageRevealService", () => {
	let service: Readonly<PageRevealService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ PageRevealService ],
		});
		service = TestBed.inject(PageRevealService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should set page reveal elements", (done: DoneFn) => {
		const startRevealElement = document.createElement("div");
		const endRevealElement = document.createElement("div");

		service.setStartRevealElement(startRevealElement);
		service.setEndRevealElement(endRevealElement);

		zip(
			service.startRevealElement$,
			service.endRevealElement$,
		).subscribe(([startElement, endElement]) => {
			expect(startElement).toEqual(startRevealElement);
			expect(endElement).toEqual(endRevealElement);
			done();
		});
	});
});
