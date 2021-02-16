
import { Component, Input, OnInit } from '@angular/core';

import { SplashState, SplashStateService } from '@app/core/services/splash-state.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	public SplashState = SplashState;

	@Input() logo: string;
	@Input() target: string;
	@Input() alt: string;

	public splashState: SplashState;

	constructor(private splashStateService: SplashStateService) { }

	ngOnInit() {
		this.splashStateService.splashState$.subscribe(
			(splashState) => {
				this.splashState = splashState;
			});
	}
}
