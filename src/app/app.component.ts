import { Component } from "@angular/core";

// import { LoaderService } from "@app/loader/loader.service";

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.scss" ],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	// TODO: Support i18n

	public readonly title = "Passeriform";

	constructor(
			// private loaderService: LoaderService
	) { }

	onRouteChange() {
		// this.loaderService.flushJobs();
	}
}
