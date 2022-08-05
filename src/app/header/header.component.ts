import type { OnInit } from "@angular/core";
import { Component, Input } from "@angular/core";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

@Component({
	selector: "app-header",
	styleUrls: [ "./header.component.scss" ],
	templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
	@Input() public readonly alt: string;
	@Input() public readonly logo: string;
	@Input() public readonly target: string;

	public readonly SplashState = SplashState;
	public splashState: SplashState;

	// TODO: Add accent color border-bottom based on page theme.

	constructor(private readonly splashStateService: SplashStateService) { }

	ngOnInit() {
		this.splashStateService.splashState$.subscribe(
			(splashState: SplashState) => {
				this.splashState = splashState;

				document.documentElement.style.setProperty(
					"--current-header-shift-offset",
					this.splashState === SplashState.BLURRED
						? "var(--shrink-header-size-em, 4em)"
						: "0"
				);
			},
		);
	}
}
