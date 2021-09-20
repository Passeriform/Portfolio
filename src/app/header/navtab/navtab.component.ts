import { Component, ContentChildren, HostBinding } from "@angular/core";
import type { OnInit, QueryList } from "@angular/core";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";

import { NavtabDirective } from "./navtab.directive";

@Component({
	selector: "app-navtab",
	styleUrls: [ "./navtab.component.scss" ],
	templateUrl: "./navtab.component.html",
})
export class NavtabComponent implements OnInit {
	@HostBinding("class.logo-shrink-fix") public shrinkFix: boolean;

	@ContentChildren(NavtabDirective) public readonly navtabItems: QueryList<NavtabDirective>;

	public splashState: SplashState;

	constructor(private readonly splashStateService: SplashStateService) { }

	ngOnInit() {
		this.splashStateService.splashState$.subscribe(
			(splashState) => {
				this.splashState = splashState;
				this.shrinkFix = splashState !== SplashState.FOCUSSED;
			},
		);
	}

	// TODO: Shift to external utility

	public propagateClick(event: MouseEvent | TouchEvent): void {
		const target = (
			event.target ?? event.currentTarget
		) as HTMLElement;

		[ ...target.children ].forEach((child: HTMLElement) => {
			child.click();
		});
	}
}
