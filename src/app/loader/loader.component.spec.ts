import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { LoaderComponent } from "./loader.component";

describe("LoaderComponent", () => {
	let component: Readonly<LoaderComponent>;
	let fixture: Readonly<ComponentFixture<LoaderComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ LoaderComponent ],
		});
		fixture = TestBed.createComponent(LoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
