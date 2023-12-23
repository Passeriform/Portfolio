import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from "apollo-angular/testing";

import { NavigatorComponent } from "@shared/navigator/navigator.component";
import { TooltipComponent } from "@shared/tooltip/tooltip.component";
import { ErrorComponent } from "@app/error/error.component";
import { ErrorService } from "@app/error/services/error.service";
import { FooterComponent } from "@app/footer/footer.component";
import { FooterService } from "@app/footer/services/footer.service";
import { HeaderComponent } from "@app/header/header.component";
import { NavtabComponent } from "@app/header/navtab/navtab.component";
import { HarmonicLoaderComponent } from "@app/loader/harmonic-loader/harmonic-loader.component";
import { LoaderService } from "@app/loader/services/loader.service";
import { CanvasService } from "@core/services/canvas.service";
import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	let component: Readonly<AppComponent>;
	let nativeElement: Readonly<HTMLElement>;
	let fixture: Readonly<ComponentFixture<AppComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ AppComponent ],
			imports: [
				ApolloTestingModule,
				ErrorComponent,
				FooterComponent,
				HarmonicLoaderComponent,
				HeaderComponent,
				NavtabComponent,
				NavigatorComponent,
				RouterTestingModule,
				TooltipComponent,
			],
			providers: [
				CanvasService,
				ErrorService,
				FooterService,
				LoaderService,
				PageRevealService,
				SplashStateService,
			],
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.debugElement.componentInstance;
		nativeElement = fixture.debugElement.nativeElement;
		fixture.detectChanges();
	});

	it("should create the app", () => {
		expect(component).toBeTruthy();
	});

	it("should have as title Passeriform", () => {
		expect(component.title).toEqual("passeriform");
	});

	it("should render title", () => {
		expect(nativeElement.querySelector(".content span")?.textContent).toContain("passeriform app is running!");
	});
});
