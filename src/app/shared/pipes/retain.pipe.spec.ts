import { JsonPipe } from "@angular/common";
import type { ComponentFixture} from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { RetainPipe } from "./retain.pipe";

@Component({
	imports: [
		JsonPipe,
		RetainPipe,
	],
	selector: "app-retain-host",
	standalone: true,
	template: "{{ model | retain: 'keyA':'keyC':'keyE' | json }}",
})
class HostComponent {
	public model = {
		keyA: "valueA",
		keyB: "valueB",
		keyC: "valueC",
		keyD: "valueD",
		keyE: "valueE",
	} as const;
}

describe("RetainPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ RetainPipe ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("retain specified keys", () => {
		const retainedObject = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(JSON.parse(retainedObject ?? "{}")).toEqual({
			keyA: "valueA",
			keyC: "valueC",
			keyE: "valueE",
		});
	});
});
