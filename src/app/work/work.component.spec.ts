import type { ComponentFixture } from "@angular/core/testing";
import { ApolloTestingModule } from "apollo-angular/testing";
import { TestBed } from "@angular/core/testing";

import { LoaderService } from "@app/loader/services/loader.service";
import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";

import { WorkService } from "./services/work.service";
import { WorkComponent } from "./work.component";

describe("WorkComponent", () => {
	let component: Readonly<WorkComponent>;
	let fixture: Readonly<ComponentFixture<WorkComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ApolloTestingModule,
				WorkComponent,
			],
			providers: [
				LoaderService,
				PageRevealService,
				SplashStateService,
				WorkService,
			],
		});
		fixture = TestBed.createComponent(WorkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
