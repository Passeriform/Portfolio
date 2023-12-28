import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { NavtabDirective } from "./navtab.directive";

@Component({
	imports: [ NavtabDirective ],
	selector: "app-navtab-target",
	standalone: true,
	template: `
		<a *appNavtab routerLink="/first">First</a>
		<a *appNavtab href="/second">Second</a>
		<a *appNavtab routerLink="/third">Third</a>
	`,
})
class HostComponent {
	@ViewChildren(NavtabDirective, { read: ElementRef }) public readonly tabs: QueryList<ElementRef<NavtabDirective>>;
}

describe("NavtabDirective", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HostComponent ],
			providers: [],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("should route to link on click", () => {
		const tabList = fixture.componentInstance.tabs.toArray();
		expect(tabList.length).toEqual(3);
	});
});
