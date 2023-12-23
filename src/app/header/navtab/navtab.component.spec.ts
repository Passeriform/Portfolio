import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SplashStateService } from "@core/services/splash-state.service";

import { NavtabComponent } from "./navtab.component";

describe("NavtabComponent", () => {
	let component: Readonly<NavtabComponent>;
	let fixture: Readonly<ComponentFixture<NavtabComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ NavtabComponent ],
			providers: [ SplashStateService ],
		});
		fixture = TestBed.createComponent(NavtabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
