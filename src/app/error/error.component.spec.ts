import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { PageRevealService } from "@core/services/page-reveal.service";

import { ErrorService } from "./services/error.service";
import { ErrorComponent } from "./error.component";

describe("ErrorComponent", () => {
	let component: Readonly<ErrorComponent>;
	let fixture: Readonly<ComponentFixture<ErrorComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ ErrorComponent ],
			providers: [
				ErrorService,
				PageRevealService,
			],
		});
		fixture = TestBed.createComponent(ErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
