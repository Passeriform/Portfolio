import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";

import { BoldSpanPipe } from "./bold-span.pipe";

describe("BoldSpanPipe", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ BoldSpanPipe ],
		});
	});

	it("create an instance", () => {
		const service: DomSanitizer = TestBed.inject(DomSanitizer);
		const pipe = new BoldSpanPipe(service);
		expect(pipe).toBeTruthy();
	});
});
