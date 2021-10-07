import { Component, HostBinding } from "@angular/core";

import { AnimationState } from "./loader.config";

@Component({
	selector: "app-loader",
	styleUrls: [ "./loader.component.scss" ],
	templateUrl: "./loader.component.html",
})
export class LoaderComponent {
	public animationState: AnimationState = AnimationState.STOPPED;

	@HostBinding("class.show") public get canvasDisplay(): boolean {
		return this.animationState !== AnimationState.STOPPED;
	}
}
