import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, async } from "@angular/core/testing";

import { PageNavComponent } from "./page-nav.component";

describe("PageNavComponent", () => {
	let component: PageNavComponent;
	let fixture: ComponentFixture<PageNavComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PageNavComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
