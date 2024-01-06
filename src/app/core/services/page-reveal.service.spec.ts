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

	it("should set page reveal elements", (done: Readonly<DoneFn>) => {
		const startRevealElement = document.createElement("div");
		const endRevealElement = document.createElement("div");

		service.setStartRevealElement({ nativeElement: startRevealElement });
		service.setEndRevealElement({ nativeElement: endRevealElement });

		zip(
			service.startRevealElement$,
			service.endRevealElement$,
		).subscribe(([startElement, endElement]) => {
			expect(startElement).toEqual({ nativeElement: startRevealElement });
			expect(endElement).toEqual({ nativeElement: endRevealElement });
			done();
		});
	});
});
