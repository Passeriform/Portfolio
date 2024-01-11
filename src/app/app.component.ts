import { Component, ElementRef, HostListener, Renderer2, RendererStyleFlags2 } from "@angular/core";
import { NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from "@angular/router";

import { EnvironmentPipe } from "@shared/pipes/environment.pipe";
import { NavigatorComponent } from "@shared/navigator/navigator.component";
import { TooltipComponent } from "@shared/tooltip/tooltip.component";
import { FooterVariant } from "@app/footer/models/footer.interface";
import { HarmonicLoaderComponent } from "@app/loader/harmonic-loader/harmonic-loader.component";
import { FooterComponent } from "@app/footer/footer.component";
import { ErrorComponent } from "@app/error/error.component";
import { HeaderComponent } from "@app/header/header.component";
import { NavtabComponent } from "@app/header/navtab/navtab.component";
import { NavtabDirective } from "@app/header/navtab/directives/navtab.directive";
import { LoaderService } from "@app/loader/services/loader.service";

@Component({
	imports: [
		EnvironmentPipe,
		ErrorComponent,
		FooterComponent,
		HarmonicLoaderComponent,
		HeaderComponent,
		NavigatorComponent,
		NavtabComponent,
		NavtabDirective,
		RouterLink,
		RouterOutlet,
		TooltipComponent,
	],
	selector: "app-root",
	standalone: true,
	styleUrls: [],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	// TODO: Support i18n

	public readonly FooterVariant = FooterVariant;

	public readonly title = "Passeriform";

	/// Fix for dynamic viewport height in mobile browser
	@HostListener("document:resize", [ "$event" ])
	public onDocumentResize(): void {
		this.renderer.setStyle(
			this.hostElement.nativeElement,
			"--apparent-viewport-height",
			`${window.innerHeight}px`,
			RendererStyleFlags2.DashCase,
		);
	}

	constructor(
			private readonly hostElement: ElementRef<HTMLElement>,
			private readonly renderer: Renderer2,
			private readonly router: Router,
			private readonly loaderService: LoaderService,
	) {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.loaderService.beginLoading("[navigation] change");
			} else if (event instanceof NavigationEnd) {
				this.loaderService.endLoading("[navigation] change");
			}
		});
	}
}
