import { TestBed, async   } from "@angular/core/testing";
import type { ComponentFixture     } from "@angular/core/testing";

import { OverlayComponent } from "./overlay.component";

describe("OverlayComponent", () => {
	let component: OverlayComponent;
	let fixture: ComponentFixture<OverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OverlayComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
