import { AsyncPipe, DOCUMENT, NgClass } from "@angular/common";
import type { OnInit } from "@angular/core";
import { Component, Inject, Input, Renderer2, RendererStyleFlags2 } from "@angular/core";
import { RouterLink } from "@angular/router";

import type { Observable } from "rxjs";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

@Component({
	imports: [
		AsyncPipe,
		NgClass,
		RouterLink,
	],
	selector: "app-header",
	standalone: true,
	styleUrls: [ "./header.component.scss" ],
	templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
	public readonly SplashState = SplashState;
	public splashState$: Observable<SplashState>;

	@Input() public readonly alt: string;
	@Input() public readonly logo: string;
	@Input() public readonly target: string;

	// TODO: Add accent color border-bottom based on page theme.

	constructor(
			@Inject(DOCUMENT) private readonly document: Document,
			private readonly splashStateService: SplashStateService,
			private readonly renderer: Renderer2,
	) { }

	ngOnInit() {
		this.splashState$ = this.splashStateService.splashState$;
		this.splashState$.subscribe((splashState: SplashState) => {
			this.renderer.setStyle(
				this.document.documentElement,
				"--current-header-shift-offset",
				splashState === SplashState.BLURRED
					? "var(--shrink-header-size-em, 4em)"
					: "0",
				RendererStyleFlags2.DashCase,
			);
		});
	}
}
