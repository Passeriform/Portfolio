import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { SplashStateService } from "@core/services/splash-state.service";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
	let component: Readonly<HeaderComponent>;
	let fixture: Readonly<ComponentFixture<HeaderComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HeaderComponent,
				RouterTestingModule,
			],
			providers: [ SplashStateService ],
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
