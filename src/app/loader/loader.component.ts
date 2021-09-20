import { Component, HostBinding } from "@angular/core";
import type { AfterViewInit } from "@angular/core";

// TODO: Try using enums in loading.

export enum AnimationState {
	STOPPED,
	RUNNING,
	RESOLVING,
}

@Component({
	selector: "app-loader",
	styleUrls: [ "./loader.component.scss" ],
	templateUrl: "./loader.component.html",
})
export class LoaderComponent implements AfterViewInit {
	public readonly animationState: AnimationState = AnimationState.STOPPED;

	@HostBinding("class.show") public get canvasDisplay(): boolean {
		return this.animationState !== AnimationState.STOPPED;
	}

	ngAfterViewInit() {
		// ngAfterViewInit
	}
}
