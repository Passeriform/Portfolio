import type { ComponentFixture } from "@angular/core/testing";
import { TestBed, async } from "@angular/core/testing";

import { SocialGlyphsComponent } from "./social-glyphs.component";

describe("SocialGlyphsComponent", () => {
	let component: SocialGlyphsComponent;
	let fixture: ComponentFixture<SocialGlyphsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SocialGlyphsComponent],
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
