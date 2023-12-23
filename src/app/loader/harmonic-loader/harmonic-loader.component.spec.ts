import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CanvasService } from "@core/services/canvas.service";

import { LoaderService } from "../services/loader.service";
import { HarmonicLoaderComponent } from "./harmonic-loader.component";

describe("HarmonicLoaderComponent", () => {
	let component: Readonly<HarmonicLoaderComponent>;
	let fixture: Readonly<ComponentFixture<HarmonicLoaderComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HarmonicLoaderComponent ],
			providers: [
				CanvasService,
				LoaderService,
			],
		});
		fixture = TestBed.createComponent(HarmonicLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
