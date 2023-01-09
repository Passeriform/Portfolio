import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TooltipDirective } from "./tooltip.directive";

@Component({
	selector: "test-tooltip-host",
	template: `
	 <div appTooltip [position]="Position.TOP" [template]="tooltipTemplate"></div>
	 <ng-template #tooltipTemplate><div id="tooltipContent"></div></ng-template>
	`,
})
class HostComponent { }

describe("TooltipDirective", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				HostComponent,
				TooltipDirective,
			],
		});
	});

	it("should show tooltip on hover", () => {
		TestBed.compileComponents().then(() => {
			const fixture = TestBed.createComponent(HostComponent);
			const tooltipTrigger = fixture.debugElement.query(By.directive(TooltipDirective));
			tooltipTrigger.triggerEventHandler("mouseover", { });
			expect(document.querySelectorAll("#tooltipContent")).toBeTruthy();
		});
	});
});
