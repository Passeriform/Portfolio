import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { commitCategoryPattern } from "@app/landing/update-roll/models/github.interface";

import { BoldSpanPipe } from "./bold-span.pipe";

@Component({
	imports: [ BoldSpanPipe ],
	selector: "app-bold-span-host",
	standalone: true,
	template: `
    <p [innerHtml]="text | boldSpan:commitCategoryPattern"></p>
  `,
})
class HostComponent {
	public readonly commitCategoryPattern = commitCategoryPattern;
	public text = "[Component]: Commit description";
}

describe("BoldSpanPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ BoldSpanPipe ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("bold part of string specified by pattern", () => {
		const boldHTML = (fixture.debugElement.nativeElement as HTMLElement).innerHTML;
		expect(boldHTML).toEqual("<p><b>[Component]:</b> Commit description</p>");
	});
});
