
import { Component, ContentChildren, DebugElement, QueryList } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { CageGridDirective } from "./cage-grid.directive";

@Component({
	imports: [ CageGridDirective ],
	selector: "app-cage-grid-host",
	standalone: true,
	template: `
		<div *appCaged [title]="'Cage Title'" [animateContent]="true">
			<div class="content">Cage Content</div>
		</div>
	`,
})
class HostComponent { }

describe("CageGridDirective", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;
	let cageElement: Readonly<DebugElement>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HostComponent,
				CageGridDirective,
			],
		});
		fixture = TestBed.createComponent(HostComponent);
		cageElement = fixture.debugElement.query(By.directive(CageGridDirective));
		fixture.detectChanges();
	});

	it("should route to link on click", () => {
		const directive = cageElement.injector.get(CageGridDirective);
		expect(directive).toBeDefined();
		// expect(cageElement?.title).toEqual("Cage Title");
		// expect(cageElement?.animateContent).toEqual(true);
	});
});
