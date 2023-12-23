import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { ApolloTestingModule } from "apollo-angular/testing";

import { LoaderService } from "@app/loader/services/loader.service";
import { PageRevealService } from "@core/services/page-reveal.service";

import { WorkService } from "../services/work.service";
import { ShowcaseComponent } from "./showcase.component";

describe("ShowcaseComponent", () => {
	let component: Readonly<ShowcaseComponent>;
	let fixture: Readonly<ComponentFixture<ShowcaseComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ApolloTestingModule,
				ShowcaseComponent,
			],
			providers: [
				LoaderService,
				PageRevealService,
				WorkService,
			],
		});
		fixture = TestBed.createComponent(ShowcaseComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
