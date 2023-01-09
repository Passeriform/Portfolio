import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { SocialGlyphsComponent } from "./social-glyphs.component";

describe("SocialGlyphsComponent", () => {
	let component: SocialGlyphsComponent;
	let fixture: ComponentFixture<SocialGlyphsComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ SocialGlyphsComponent ],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SocialGlyphsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
