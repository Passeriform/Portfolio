import { Component, AfterViewInit, HostBinding } from '@angular/core';

// TODO: Try using enums in loading.
export enum AnimationState {
	Stopped,
	Running,
	Resolving,
}

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.sass'],
})
export class LoaderComponent implements AfterViewInit {
	public animationState: AnimationState = AnimationState.Stopped;

	@HostBinding('class.show') get canvasDisplay() {
		return this.animationState !== AnimationState.Stopped;
	}

	constructor() { }

	// TODO: Add void return type to all constructor and ng-lifecycle-hooks
	ngAfterViewInit() { }
}
