import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TooltipComponent } from "./tooltip.component";

describe("TooltipComponent", () => {
	let component: Readonly<TooltipComponent>;
	let fixture: Readonly<ComponentFixture<TooltipComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ TooltipComponent ],
		});
		fixture = TestBed.createComponent(TooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
