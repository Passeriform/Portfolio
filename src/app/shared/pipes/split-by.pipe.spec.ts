import { JsonPipe } from "@angular/common";
import type { ComponentFixture} from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { SplitByPipe } from "./split-by.pipe";

@Component({
	imports: [
		JsonPipe,
		SplitByPipe,
	],
	selector: "app-split-by-host",
	standalone: true,
	template: "{{ combinedText | splitBy:'/' | json }}",
})
class HostComponent {
	public combinedText = "This/is/combined/text";
}

describe("SplitByPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ SplitByPipe ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("split-by specified separator", () => {
		const splitObject = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(JSON.parse(splitObject ?? "{}")).toEqual([
			"This",
			"is",
			"combined",
			"text",
		]);
	});
});
