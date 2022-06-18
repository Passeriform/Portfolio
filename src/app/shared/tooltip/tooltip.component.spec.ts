import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, async } from "@angular/core/testing";

import { TooltipComponent } from "./tooltip.component";

describe("TooltipComponent", () => {
	let component: TooltipComponent;
	let fixture: ComponentFixture<TooltipComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
