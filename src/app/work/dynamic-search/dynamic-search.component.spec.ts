import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { DynamicSearchComponent } from "./dynamic-search.component";

describe("DynamicSearchComponent", () => {
	let component: DynamicSearchComponent<{ tags: readonly string[] }>;
	let fixture: ComponentFixture<DynamicSearchComponent<{ tags: readonly string[] }>>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ DynamicSearchComponent ],
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
