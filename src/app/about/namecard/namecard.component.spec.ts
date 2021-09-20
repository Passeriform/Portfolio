import { TestBed, async   } from "@angular/core/testing";
import type { ComponentFixture     } from "@angular/core/testing";

import { NamecardComponent } from "./namecard.component";

describe("NamecardComponent", () => {
	let component: NamecardComponent;
	let fixture: ComponentFixture<NamecardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NamecardComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NamecardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
