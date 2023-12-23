import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from "apollo-angular/testing";

import { ErrorService } from "@app/error/services/error.service";
import { LoaderService } from "@app/loader/services/loader.service";
import { PageRevealService } from "@core/services/page-reveal.service";

import { FooterService } from "./services/footer.service";
import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
	let component: Readonly<FooterComponent>;
	let fixture: Readonly<ComponentFixture<FooterComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ApolloTestingModule,
				FooterComponent,
				RouterTestingModule,
			],
			providers: [
				ErrorService,
				FooterService,
				LoaderService,
				PageRevealService,
			],
		});
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
