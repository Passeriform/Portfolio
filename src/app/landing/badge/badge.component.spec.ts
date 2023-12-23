import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { BadgeComponent } from "./badge.component";

describe("BadgeComponent", () => {
	let component: Readonly<BadgeComponent>;
	let fixture: Readonly<ComponentFixture<BadgeComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ BadgeComponent ],
		});
		fixture = TestBed.createComponent(BadgeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
