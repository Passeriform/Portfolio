import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PageNavComponent } from "./page-nav.component";

describe("PageNavComponent", () => {
	let component: Readonly<PageNavComponent>;
	let fixture: Readonly<ComponentFixture<PageNavComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ PageNavComponent ],
		});
		fixture = TestBed.createComponent(PageNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
