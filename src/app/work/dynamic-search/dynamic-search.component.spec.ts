import { TestBed, async   } from "@angular/core/testing";
import type { ComponentFixture     } from "@angular/core/testing";

import { DynamicSearchComponent } from "./dynamic-search.component";

describe("DynamicSearchComponent", () => {
	let component: DynamicSearchComponent;
	let fixture: ComponentFixture<DynamicSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DynamicSearchComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
