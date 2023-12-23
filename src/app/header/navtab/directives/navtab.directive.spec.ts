import type { DebugElement } from "@angular/core";
import { Component, ContentChildren, QueryList } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SplashStateService } from "@core/services/splash-state.service";

import { NavtabDirective } from "./navtab.directive";
import { NavtabComponent } from "../navtab.component";

@Component({
	imports: [ NavtabComponent ],
	selector: "app-navtab-target",
	standalone: true,
	template: `
    <a appNavLink routerLink="/first">First</a>
    <a appNavLink href="/second">Second</a>
    <a appNavLink routerLink="/third">Third</a>
	`,
})
class HostComponent {
	@ContentChildren(NavtabDirective, { descendants: true }) public readonly tabs: QueryList<NavtabDirective>;
}

describe("NavtabDirective", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;
	let tabs: Readonly<DebugElement[]>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HostComponent,
				NavtabDirective,
			],
			providers: [ SplashStateService ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("should route to link on click", () => {
		tabs = fixture.debugElement.queryAll(By.directive(NavtabDirective));
		expect(tabs[0]?.nativeElement).toEqual(1);
	});
});
