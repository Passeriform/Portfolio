import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ChirpyComponent } from "./chirpy.component";

describe("ChirpyComponent", () => {
	let component: Readonly<ChirpyComponent>;
	let fixture: Readonly<ComponentFixture<ChirpyComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ ChirpyComponent ],
		});
		fixture = TestBed.createComponent(ChirpyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
