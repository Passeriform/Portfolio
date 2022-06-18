import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, async } from "@angular/core/testing";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FooterComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
