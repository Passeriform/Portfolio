import { Component, EventEmitter, HostBinding, Output } from "@angular/core";

import { OverlayState } from "./overlay.config";

@Component({
	selector: "app-overlay",
	styleUrls: [ "./overlay.component.scss" ],
	templateUrl: "./overlay.component.html",
})
export class OverlayComponent {
	public overlayState: OverlayState;

	public readonly OverlayState = OverlayState;

	@Output() public readonly triggerEvent: EventEmitter<void> = new EventEmitter<void>();

	@HostBinding("class.blink") public blinkEnabled = true;

	public toggleOverlay(): void {
		this.overlayState = this.overlayState === OverlayState.SHOW
			? OverlayState.HIDE
			: OverlayState.SHOW;
	}

	public hideOverlay(): void {
		this.overlayState = OverlayState.HIDE;
	}

	public handleButtonClick(): void {
		this.toggleOverlay();
		this.blinkEnabled = false;
		this.triggerEvent.emit();
	}
}
