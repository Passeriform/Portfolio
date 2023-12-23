import { HttpClientTestingModule } from "@angular/common/http/testing";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { LoaderService } from "@app/loader/services/loader.service";
import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";

import { GithubService } from "./update-roll/services/github.service";
import { LandingComponent } from "./landing.component";

describe("LandingComponent", () => {
	let component: Readonly<LandingComponent>;
	let fixture: Readonly<ComponentFixture<LandingComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				LandingComponent,
			],
			providers: [
				GithubService,
				LoaderService,
				PageRevealService,
				SplashStateService,
			],
		});
		fixture = TestBed.createComponent(LandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
