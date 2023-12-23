import type { ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";

import { NamecardComponent } from "./namecard.component";

describe("NamecardComponent", () => {
	let component: Readonly<NamecardComponent>;
	let fixture: Readonly<ComponentFixture<NamecardComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NamecardComponent,
				RouterTestingModule,
			],
		});
		fixture = TestBed.createComponent(NamecardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
