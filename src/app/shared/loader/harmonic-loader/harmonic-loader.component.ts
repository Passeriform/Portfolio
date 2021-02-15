// TODO: Bind progress percentage to observables
// TODO: Required a huge makeover (canvas-style animations do not mesh well with Angular-style ones)
import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';

import { HarmonicLoaderConfig } from './harmonic-loader.interface';
import { LoaderComponent } from '../loader.component';
import { LoadingState, LoadingJob, LoaderService } from '@app/core/services/loader.service';
import { CanvasService } from '@app/core/services/canvas.service';
import { generateLoaderConfig } from './harmonic-loader.config';
import { AnimationState, getDotsPos, percToPhaseAngle } from '../loader.config';

@Component({
	selector: 'app-harmonic-loader',
	templateUrl: '../loader.component.html',
	styleUrls: [
		'./harmonic-loader.component.sass',
		'../loader.component.sass',
	],
})
export class HarmonicLoaderComponent extends LoaderComponent implements AfterViewInit {
	public loadingJobsState: LoadingJob[];
	public loaderPerc: number;

	public animStartFrame: number;
	public retarder = 0;

	public animationState: AnimationState = AnimationState.Stopped;

	public loaderConfig: HarmonicLoaderConfig;
	public dotsPos: number[];

	public context: CanvasRenderingContext2D;

	@ViewChild('loaderCanvas', { static: true }) loaderCanvas: ElementRef<HTMLCanvasElement>;

	// TODO: Shift this into canvas.service
	@HostListener('window:resize')
	onResize(): void {
		this.prepareCanvas();
	}

	constructor(
		private loaderService: LoaderService,
		private canvasService: CanvasService
	) {
		super();
		this.loaderService.loadingProgressState$.subscribe(
			(loadedPercentage) => {
				this.loaderPerc = loadedPercentage;
			});

		this.loaderService.loadingJobsState$.subscribe(
			(loadingJobsState) => {
				this.loadingJobsState = loadingJobsState;

				const initiationLabels = this.loadingJobsState
					.filter(
						(job) => job.state === LoadingState.LoadingQueued
					)
					.map(
						(job) => job.label
					);

				// Only trigger when new labels are found to be queued
				if (Array.isArray(initiationLabels) && initiationLabels.length) {
					this.loaderService.setAnimationStart(initiationLabels);

					// Only triggers when jobs aren't all loaded and animation is not running
					if (
						!this.loaderService.areAllJobsCompleted &&
						this.animationState === AnimationState.Stopped
					) {
						this.beginLoadingAnimation();
					}
				}
			});
	}

	ngAfterViewInit() {
		this.canvasService.setCanvasElement(this.loaderCanvas);

		this.prepareCanvas();

		this.canvasService.canvasContext$.subscribe((ctx) => this.context = ctx);
	}

	prepareCanvas() {
		this.canvasService.refreshContext();

		this.loaderCanvas.nativeElement.width = window.innerWidth;
		this.loaderCanvas.nativeElement.height = window.innerHeight;

		this.loaderConfig = generateLoaderConfig(
			this.loaderCanvas.nativeElement.width,
			this.loaderCanvas.nativeElement.height
		);

		this.dotsPos = getDotsPos(this.loaderConfig.dotsDist);
	}

	beginLoadingAnimation(): void {
		this.animationState = AnimationState.Running;

		this.prepareCanvas();

		window.requestAnimationFrame(this.tick);
	}

	// TODO: Abstract these methods under a separate canvas renderer module.
	// TODO: These methods need `this` binding, hence the arrow syntax. Resolve consistency
	tick = (timestamp: number): void => {
		if (!this.animStartFrame) {
			this.animStartFrame = timestamp;
		}

		const elapsed = timestamp - this.animStartFrame;

		this.context.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsPos.map((val, idx) => {
			// Sine Wave 1
			this.canvasService.drawDot({
				x: (window.innerWidth / 2) + val + (this.loaderConfig.dotRadius / 2),
				y: this.loaderConfig.yoffset +
					this.loaderConfig.amplitude *
					Math.sin(
						(this.loaderConfig.speed * elapsed) / 10000 +
						val +
						// This.loaderConfig.frequency * val +
						this.loaderConfig.basePhase
					),
				radius: this.loaderConfig.dotRadius,
				color: `hsl(241, 30%, ${(idx * 2) + 50}%)`,
			});

			// Sine Wave 2
			this.canvasService.drawDot({
				x: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + val + (this.loaderConfig.dotRadius / 2),
				y: this.loaderConfig.yoffset +
					this.loaderConfig.amplitude *
					Math.sin(
						(this.loaderConfig.speed * elapsed) / 10000 +
						val +
						// This.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val) +
						this.loaderConfig.basePhase +
						percToPhaseAngle(this.loaderPerc)
					),
				radius: this.loaderConfig.dotRadius,
				color: `hsl(241, 30%, ${((idx * 2) + 1) + 50}%)`,
			});
		});

		if (this.loaderService.areAllJobsCompleted) {
			this.animationState = AnimationState.Resolving;
			window.requestAnimationFrame(this.resolveDots);
		} else {
			window.requestAnimationFrame(this.tick);
		}
	}

	resolveDots = (timestamp: number): void => {
		if (!this.animStartFrame) {
			this.animStartFrame = timestamp;
		}

		const elapsed = timestamp - this.animStartFrame;

		this.context.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsPos.map((val, idx) => {
			// Sine Wave 1
			this.canvasService.drawDot({
				x: (window.innerWidth / 2) + val + (this.loaderConfig.dotRadius / 2),
				y: this.loaderConfig.yoffset +
					Math.max(0, this.loaderConfig.amplitude - this.retarder) *
					Math.sin(
						(this.loaderConfig.speed * elapsed) / 10000 +
						val +
						// This.loaderConfig.frequency * val +
						this.loaderConfig.basePhase
					),
				radius: this.loaderConfig.dotRadius,
				color: `hsl(241, 30%, ${(idx * 2) + 50}%)`,
			});

			// Sine Wave 2
			this.canvasService.drawDot({
				x: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + val + (this.loaderConfig.dotRadius / 2),
				y: this.loaderConfig.yoffset +
					Math.max(0, this.loaderConfig.amplitude - this.retarder) *
					Math.sin(
						(this.loaderConfig.speed * elapsed) / 10000 +
						val +
						// This.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val) +
						this.loaderConfig.basePhase +
						percToPhaseAngle(this.loaderPerc)
					),
				radius: this.loaderConfig.dotRadius,
				color: `hsl(241, 30%, ${((idx * 2) + 1) + 50}%)`,
			});
		});

		this.retarder += this.loaderConfig.retardationRate;

		if (this.retarder > this.loaderConfig.amplitude) {
			this.animationState = AnimationState.Stopped;
			this.retarder = 0;
			this.loaderService.flushJobs();
		} else {
			window.requestAnimationFrame(this.resolveDots);
		}
	}
}
