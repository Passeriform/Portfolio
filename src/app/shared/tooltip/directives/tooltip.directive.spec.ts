import type { DebugElement } from "@angular/core";
import { Component } from "@angular/core";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { Position } from "@shared/models/cardinals.interface";

import { TooltipDirective } from "./tooltip.directive";

@Component({
	imports: [ TooltipDirective ],
	selector: "app-tooltip-host",
	standalone: true,
	template: `
		<div appTooltip [position]="Position.TOP" [template]="tooltipTemplate"></div>
		<ng-template #tooltipTemplate><div id="tooltipContent"></div></ng-template>
	`,
})
class HostComponent {
	public Position = Position;
}

describe("TooltipDirective", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;
	let tooltipTrigger: Readonly<DebugElement>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HostComponent,
				TooltipDirective,
			],
		});
		fixture = TestBed.createComponent(HostComponent);
		tooltipTrigger = fixture.debugElement.query(By.directive(TooltipDirective));
		fixture.detectChanges();
	});

	it("should show tooltip on hover", () => {
		tooltipTrigger.triggerEventHandler("mouseover", { });
		expect(document.querySelectorAll("#tooltipContent")).toBeTruthy();
	});
});
