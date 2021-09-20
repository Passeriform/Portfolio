import { TestBed, async   } from "@angular/core/testing";
import type { ComponentFixture     } from "@angular/core/testing";

import { CageGridComponent } from "./cage-grid.component";

describe("CageGridComponent", () => {
	let component: CageGridComponent;
	let fixture: ComponentFixture<CageGridComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CageGridComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CageGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
