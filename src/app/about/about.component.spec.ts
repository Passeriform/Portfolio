import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import type { Observable} from "rxjs";
import { of } from "rxjs";

import { LoaderService } from "@app/loader/services/loader.service";
import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";

import type { AboutModel } from "./models/about.interface";
import { AboutComponent } from "./about.component";

const aboutModelMock: readonly AboutModel[] = [
	{
		additionalTitle: "additionalTitle",
		avatar: "https://site.com/avatar.png",
		brief: "brief",
		contactMessage: "contactMessage",
		// eslint-disable-next-line camelcase
		peopleStoryCollection: { edges: [] },
		route: "/route",
		slug: "about-slug",
		socials: [],
		title: "title",
		type: "PEOPLE",
	},
];

describe("AboutComponent", () => {
	let component: Readonly<AboutComponent>;
	let fixture: Readonly<ComponentFixture<AboutComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AboutComponent,
				RouterTestingModule,
			],
			providers: [
				// eslint-disable-next-line rxjs/finnish
				{ provide: ActivatedRoute, useValue: { data: of({ model: aboutModelMock }) } },
				LoaderService,
				PageRevealService,
				SplashStateService,
			],
		});
		fixture = TestBed.createComponent(AboutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
