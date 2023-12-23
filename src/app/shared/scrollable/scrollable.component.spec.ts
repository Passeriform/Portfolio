import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";

import { ScrollableComponent } from "./scrollable.component";

describe("ScrollableComponent", () => {
	let component: Readonly<ScrollableComponent>;
	let fixture: Readonly<ComponentFixture<ScrollableComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ ScrollableComponent ],
			providers: [
				PageRevealService,
				SplashStateService,
			],
		});
		fixture = TestBed.createComponent(ScrollableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
