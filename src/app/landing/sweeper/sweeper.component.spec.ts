import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SweeperComponent } from "./sweeper.component";

describe("SweeperComponent", () => {
	let component: Readonly<SweeperComponent>;
	let fixture: Readonly<ComponentFixture<SweeperComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ SweeperComponent ],
		});
		fixture = TestBed.createComponent(SweeperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
