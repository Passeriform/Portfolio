import { TestBed } from "@angular/core/testing";
import { WikiService } from "@core/services/wiki.service";

import { take } from 'rxjs/operators';

import { WikiEntry } from './../../core/services/wiki.interface';
import { WikiPipe } from "./wiki.pipe";

describe("WikiPipe", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ WikiService ],
		});
	});

	it("create an instance", () => {
		const service: WikiService = TestBed.inject(WikiService);
		const pipe = new WikiPipe(service);
		expect(pipe).toBeTruthy();
	});

	it("fetch wiki entry for test value", () => {
		const service: WikiService = TestBed.inject(WikiService);
		const pipe = new WikiPipe(service);
		pipe.transform("angular")
			.pipe(take(1))
			.subscribe((value: WikiEntry) => {
				expect(value.href).toEqual("https://en.wikipedia.org/wiki/Angular_(web_framework)");
				expect(value.description).toBeTruthy();
				expect(value.title).toBeTruthy();
			});
	});
});
