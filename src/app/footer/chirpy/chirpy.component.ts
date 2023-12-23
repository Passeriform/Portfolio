import { Component, HostListener } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";
import { TooltipDirective } from "@shared/tooltip/directives/tooltip.directive";

import { SAY_MESSAGES, SPECIAL_MESSAGES } from "./chirpy.config";

@Component({
	imports: [ TooltipDirective ],
	selector: "app-chirpy",
	standalone: true,
	styleUrls: [ "./chirpy.component.scss" ],
	templateUrl: "./chirpy.component.html",
})
export class ChirpyComponent {
	private hoverCount = 0;

	public currentMessage = "";
	public readonly Position = Position;

	@HostListener("mouseover")
	public onMouseover(): void {
		this.hoverCount += 1;
		this.sayMessage();
	}

	public sayMessage(): void {
		if (Object.keys(SPECIAL_MESSAGES).includes(this.hoverCount.toString())) {
			// TODO: Add background, border, animation and other glam for easter egg hoverCount.
			this.currentMessage = SPECIAL_MESSAGES[this.hoverCount]!;
		} else {
			const messageIndex = 0 + Math.floor(Math.random() * SAY_MESSAGES.length);
			this.currentMessage = SAY_MESSAGES[messageIndex]!;
		}
	}
}
