import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CageGridComponent } from "./cage-grid.component";

describe("CageGridComponent", () => {
	let component: Readonly<CageGridComponent>;
	let fixture: Readonly<ComponentFixture<CageGridComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ CageGridComponent ],
		});
		fixture = TestBed.createComponent(CageGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
