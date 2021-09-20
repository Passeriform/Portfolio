import { TestBed, async } from "@angular/core/testing";
import type { ComponentFixture } from "@angular/core/testing";

import { ChirpyComponent } from "./chirpy.component";

describe("ChirpyComponent", () => {
	let component: ChirpyComponent;
	let fixture: ComponentFixture<ChirpyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChirpyComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChirpyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
