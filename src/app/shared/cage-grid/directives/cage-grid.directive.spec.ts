
import { Component, QueryList, ViewChildren } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { CageGridDirective } from "./cage-grid.directive";

@Component({
	imports: [ CageGridDirective ],
	selector: "app-cage-grid-host",
	standalone: true,
	template: `
		<div *appCaged="'Cage Title'; animateContent: true">
			<div class="content">Cage Content</div>
		</div>
	`,
})
class HostComponent {
	@ViewChildren(CageGridDirective) public readonly cageElements: QueryList<CageGridDirective>;
}

describe("CageGridDirective", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HostComponent,
				CageGridDirective,
			],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("should route to link on click", () => {
		const cageElements = fixture.componentInstance.cageElements.toArray();
		expect(cageElements).toBeDefined();
		expect(cageElements.length).toEqual(1);
		expect(cageElements[0]?.title).toEqual("Cage Title");
		expect(cageElements[0]?.animateContent).toEqual(true);
	});
});
