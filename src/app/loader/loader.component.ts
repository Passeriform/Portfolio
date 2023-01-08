import { Component, HostBinding } from "@angular/core";

import { AnimationState } from "./models/loader.interface";

@Component({
	selector: "app-loader",
	styleUrls: [ "./loader.component.scss" ],
	templateUrl: "./loader.component.html",
})
export class LoaderComponent {
	public animationState: AnimationState = AnimationState.STOPPED;

	@HostBinding("class.show")
	public get canvasDisplay(): boolean {
		return this.animationState !== AnimationState.STOPPED;
	}
}
