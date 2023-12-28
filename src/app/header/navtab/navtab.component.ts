import { NgClass, NgFor, NgTemplateOutlet } from "@angular/common";
import type { OnInit } from "@angular/core";
import { Component, ContentChildren, HostBinding, QueryList, TemplateRef } from "@angular/core";

import { SplashState } from "@core/services/splash-state.interface";
import { SplashStateService } from "@core/services/splash-state.service";
import { propagateClickToChildren } from "@utility/events";

import { NavtabDirective } from "./directives/navtab.directive";

@Component({
	imports: [
		NgClass,
		NgFor,
		NgTemplateOutlet,
		NavtabDirective,
	],
	selector: "app-navtab",
	standalone: true,
	styleUrls: [ "./navtab.component.scss" ],
	templateUrl: "./navtab.component.html",
})
export class NavtabComponent implements OnInit {
	public propagateClick: (clickEvent: KeyboardEvent | MouseEvent | TouchEvent) => void = propagateClickToChildren;

	@HostBinding("class.logo-shrink-fix") public shrinkFix: boolean;

	@ContentChildren(
		NavtabDirective,
		{ descendants: true, read: TemplateRef },
	) public readonly tabs: QueryList<TemplateRef<NavtabDirective>>;


	constructor(private readonly splashStateService: SplashStateService) { }

	ngOnInit() {
		this.splashStateService.splashState$.subscribe((splashState: SplashState) => {
			this.shrinkFix = splashState !== SplashState.FOCUSSED;
		});
	}

	// TODO: Shift to external utility
}
