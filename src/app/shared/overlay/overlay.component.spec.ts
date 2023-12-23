import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { OverlayComponent } from "./overlay.component";

describe("OverlayComponent", () => {
	let component: Readonly<OverlayComponent>;
	let fixture: Readonly<ComponentFixture<OverlayComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ OverlayComponent ],
		});
		fixture = TestBed.createComponent(OverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
