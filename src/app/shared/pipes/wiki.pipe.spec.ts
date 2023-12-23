import { AsyncPipe, JsonPipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import type { ComponentFixture} from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

import { of } from "rxjs";

import { WikiService } from "@core/services/wiki.service";

import { WikiPipe } from "./wiki.pipe";

@Component({
	imports: [
		AsyncPipe,
		JsonPipe,
		WikiPipe,
	],
	selector: "app-wiki-host",
	standalone: true,
	template: "{{ identifier | wiki | async | json }}",
})
class HostComponent {
  public identifier = "identifier";
}

describe("WikiPipe", () => {
	const wikiDetails = {
		description: "description",
		href: "href",
		title: "title",
	};
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				WikiPipe,
			],
			providers: [ { provide: WikiService, useValue: jasmine.createSpyObj<WikiService>("WikiService", [ "getWikiDetail$" ]) } ],
		});

		const wikiServiceSpy = TestBed.inject(WikiService);
		(wikiServiceSpy as jasmine.SpyObj<WikiService>).getWikiDetail$.and.returnValue(of(wikiDetails));

		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("fetch wiki entry for test value", () => {
		const detailsText = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(JSON.parse(detailsText ?? "{}")).toEqual(wikiDetails);
	});
});
