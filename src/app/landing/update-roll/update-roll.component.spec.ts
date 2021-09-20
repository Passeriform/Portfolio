import { TestBed, async   } from "@angular/core/testing";
import type { ComponentFixture     } from "@angular/core/testing";

import { UpdateRollComponent } from "./update-roll.component";

describe("UpdateRollComponent", () => {
	let component: UpdateRollComponent;
	let fixture: ComponentFixture<UpdateRollComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UpdateRollComponent],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UpdateRollComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
