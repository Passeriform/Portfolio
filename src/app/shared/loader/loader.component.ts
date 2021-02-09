import { Component, AfterViewInit } from '@angular/core';

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
	public animationRunning = false;

	constructor() { }

	// TODO: Add void return type to all constructor and ng-lifecycle-hooks
	ngAfterViewInit() { }

	getDotsPos(splitDist: number): number[] {
		const dotsCount = window.innerWidth / splitDist;
		const splitLocs: number[] = Array.from({ length: dotsCount })
			.fill(0)
			.map((_, idx) =>
				splitDist * (idx - ((dotsCount - 0.5) / 2))
			);

		return splitLocs;
	}
}
