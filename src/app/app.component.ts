import { Component } from '@angular/core';

// Import { LoaderService } from './services/loader.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
})
export class AppComponent {
	title = 'Passeriform';

	constructor(
		// Private loaderService: LoaderService
	) { }

	onRouteChange() {
		// This.loaderService.flushJobs();
	}
}
