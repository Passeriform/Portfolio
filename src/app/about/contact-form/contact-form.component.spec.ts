import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ContactFormComponent } from "./contact-form.component";

describe("ContactFormComponent", () => {
	let component: Readonly<ContactFormComponent>;
	let fixture: Readonly<ComponentFixture<ContactFormComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ ContactFormComponent ],
		});
		fixture = TestBed.createComponent(ContactFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
