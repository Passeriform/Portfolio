import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import type { Taggable } from "@utility/tags";

import { DynamicSearchComponent } from "./dynamic-search.component";

type Model = Required<Taggable>;

describe("DynamicSearchComponent", () => {
	let component: Readonly<DynamicSearchComponent<Model>>;
	let fixture: Readonly<ComponentFixture<DynamicSearchComponent<Model>>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ DynamicSearchComponent ],
		});
		fixture = TestBed.createComponent(DynamicSearchComponent);
		component = fixture.componentInstance;
		// eslint-disable-next-line rxjs/finnish
		Object.defineProperty(component, "resetTrigger$", { value: of() });
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
