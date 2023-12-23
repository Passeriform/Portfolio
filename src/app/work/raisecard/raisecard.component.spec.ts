import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { RaisecardComponent } from "./raisecard.component";

describe("RaisecardComponent", () => {
	let component: Readonly<RaisecardComponent>;
	let fixture: Readonly<ComponentFixture<RaisecardComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ RaisecardComponent ],
		});
		fixture = TestBed.createComponent(RaisecardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
