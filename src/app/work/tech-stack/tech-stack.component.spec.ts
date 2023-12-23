import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TechStackComponent } from "./tech-stack.component";

describe("TechStackComponent", () => {
	let component: Readonly<TechStackComponent>;
	let fixture: Readonly<ComponentFixture<TechStackComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ TechStackComponent ],
		});
		fixture = TestBed.createComponent(TechStackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
