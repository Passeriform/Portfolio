import type { OnInit } from "@angular/core";
import { Component, ContentChildren, HostBinding, QueryList } from "@angular/core";

import type { Observable } from "rxjs";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";
import { propagateClickToChildren } from "@utility/events";

import { NavtabDirective } from "./directives/navtab.directive";

@Component({
	selector: "app-navtab",
	styleUrls: [ "./navtab.component.scss" ],
	templateUrl: "./navtab.component.html",
})
export class NavtabComponent implements OnInit {
	@HostBinding("class.logo-shrink-fix") public shrinkFix: boolean;

	@ContentChildren(NavtabDirective) public readonly navtabItems: QueryList<NavtabDirective>;

	public splashState$: Observable<SplashState>;
	public propagateClick: (clickEvent: KeyboardEvent | MouseEvent | TouchEvent) => void = propagateClickToChildren;

	constructor(private readonly splashStateService: SplashStateService) { }

	ngOnInit() {
		this.splashState$ = this.splashStateService.splashState$;
		this.splashState$.subscribe((splashState: SplashState) => {
			this.shrinkFix = splashState !== SplashState.FOCUSSED;
		});
	}

	// TODO: Shift to external utility
}
