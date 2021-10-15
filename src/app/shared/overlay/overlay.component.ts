import { Component, EventEmitter, HostBinding, Output } from "@angular/core";
import type { OnInit } from "@angular/core";

import { WorkService } from "@app/work/services/work.service";
import type { WorkModel } from "@app/work/work.interface";

enum OverlayState {
	HIDE,
	SHOW,
}

@Component({
	selector: "app-overlay",
	styleUrls: [ "./overlay.component.scss" ],
	templateUrl: "./overlay.component.html",
})
export class OverlayComponent implements OnInit {
	@HostBinding("class.blink") public blinkEnabled = true;

	public readonly OverlayState = OverlayState;
	public overlayState: OverlayState;

	@Output() triggerEvent: EventEmitter<void> = new EventEmitter<void>();

	constructor(private readonly workService: WorkService) { }

	ngOnInit() {
		this.workService.workSelectedState$.subscribe((model?: WorkModel) => {
			if (model) {
				this.blinkEnabled = false;
			}
		});
	}

	public toggleOverlay(): void {
		this.overlayState = this.overlayState === OverlayState.SHOW
			? OverlayState.HIDE
			: OverlayState.SHOW;
	}

	public showOverlay(): void {
		this.overlayState = OverlayState.SHOW;
	}

	public hideOverlay(): void {
		this.overlayState = OverlayState.HIDE;
	}

	public disableBlink(): void {
		this.blinkEnabled = false;
	}

	public handleButtonClick(): void {
		this.toggleOverlay();
		this.disableBlink();
		this.triggerEvent.emit();
	}
}
