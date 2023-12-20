import { Component, HostListener } from "@angular/core";
import { FooterVariant } from "@app/footer/models/footer.interface";

// import { LoaderService } from "@app/loader/services/loader.service";

@Component({
	selector: "app-root",
	styleUrls: [ ],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	// TODO: Support i18n

	public readonly FooterVariant = FooterVariant;

	public readonly title = "Passeriform";

	/// Fix for dynamic viewport height in mobile browser
	@HostListener("document:resize", [ "$event" ])
	public onDocumentResize(): void {
		document.documentElement.style.setProperty(
			"--apparent-viewport-height",
			`${window.innerHeight}px`,
		);
	}

	constructor(
			// private loaderService: LoaderService
	) { }

	onRouteChange() {
		// this.loaderService.flushJobs();
	}
}
