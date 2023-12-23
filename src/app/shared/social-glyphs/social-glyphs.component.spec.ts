import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { SocialGlyphsComponent } from "./social-glyphs.component";

describe("SocialGlyphsComponent", () => {
	let component: Readonly<SocialGlyphsComponent>;
	let fixture: Readonly<ComponentFixture<SocialGlyphsComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ SocialGlyphsComponent ],
		});
		fixture = TestBed.createComponent(SocialGlyphsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
