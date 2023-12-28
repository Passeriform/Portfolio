import { Component, HostBinding } from "@angular/core";

import { AnimationState } from "./models/loader.interface";

@Component({
	selector: "app-loader",
	standalone: true,
	styleUrls: [ "./loader.component.scss" ],
	templateUrl: "./loader.component.html",
})
export class LoaderComponent {
	protected animationState: AnimationState = AnimationState.STOPPED;

	@HostBinding("class.show") public show: boolean;

	public setAnimationState(animationState: AnimationState): void {
		this.animationState = animationState;
		setTimeout(() => {
			this.show = this.animationState !== AnimationState.STOPPED;
		}, 1);
	}
}
