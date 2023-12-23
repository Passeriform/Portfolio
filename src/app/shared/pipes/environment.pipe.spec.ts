import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { environment } from "@env/environment";

import { EnvironmentPipe } from "./environment.pipe";

@Component({
	imports: [ EnvironmentPipe ],
	selector: "app-environment-host",
	standalone: true,
	template: "{{ variable | environment }}",
})
class HostComponent {
	public readonly variable = "apiUrl";
}

describe("EnvironmentPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ EnvironmentPipe ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("resolve environment variable by name", () => {
		const environmentValue = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(environmentValue).toEqual(environment.apiUrl);
	});
});
