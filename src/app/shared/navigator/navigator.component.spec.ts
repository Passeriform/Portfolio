import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { NavigatorComponent } from "./navigator.component";

describe("NavigatorComponent", () => {
	let component: Readonly<NavigatorComponent>;
	let fixture: Readonly<ComponentFixture<NavigatorComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ NavigatorComponent ],
		});
		fixture = TestBed.createComponent(NavigatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
