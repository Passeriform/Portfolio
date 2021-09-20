// TODO: Bind progress percentage to observables

// TODO: Required a huge makeover (canvas-style animations do not mesh well with Angular-style ones)

import type { AfterViewInit } from "@angular/core";
import { Component, HostListener, ViewChild, ElementRef } from "@angular/core";

import { CanvasService } from "@core/services/canvas.service";
import { LoadingState } from "@app/loader/loader.interface";
import type { LoadingJob } from "@app/loader/loader.service";
import { LoaderService } from "@app/loader/loader.service";
import { AnimationState, getDotsPos, percToPhaseAngle } from "../loader.config";
import { generateLoaderConfig, Constants } from "./harmonic-loader.config";
import type { HarmonicLoaderConfig } from "./harmonic-loader.interface";
import { LoaderComponent } from "../loader.component";

@Component({
	selector: "app-harmonic-loader",
	styleUrls: [
		"./harmonic-loader.component.scss",
		"../loader.component.scss",
	],
	templateUrl: "../loader.component.html",
})
export class HarmonicLoaderComponent extends LoaderComponent implements AfterViewInit {
	// TODO: Use consistent options for ViewChild, ViewChildren, ContentChild and ContentChildren

	@ViewChild("loaderCanvas", {
		read: ElementRef,
		static: true,
	}) private readonly loaderCanvas: ElementRef<HTMLCanvasElement>;

	public animationState: AnimationState = AnimationState.STOPPED;

	public retarder: number = Constants.DEFAULT_RETARDER;

	public animStartFrame: number;

	public context?: CanvasRenderingContext2D;

	public dotsPos: readonly number[];

	public loaderConfig: HarmonicLoaderConfig;

	public loaderPerc: number;

	public loadingJobsState: readonly LoadingJob[];

	// TODO: Shift this into canvas.service
	@HostListener("window:resize")
	public onResize(): void {
		this.prepareCanvas();
	}

	constructor(
			private readonly loaderService: LoaderService,
			private readonly canvasService: CanvasService,
	) {
		super();
		this.loaderService.loadingProgressState$.subscribe(
			(loadedPercentage) => {
				this.loaderPerc = loadedPercentage;
			},
		);
	}

	// TODO: Abstract these methods under a separate canvas renderer module.

	// TODO: These methods need `this` binding, hence the arrow syntax. Resolve consistency

	private readonly tick = (timestamp: number): void => {
		if (!this.animStartFrame) {
			this.animStartFrame = timestamp;
		}

		const elapsed = timestamp - this.animStartFrame;

		this.context?.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsPos.forEach((value: number, index: number) => {
			// First Sine Wave
			this.canvasService.drawDot({
				color: `hsl(241, 30%, ${(index * 2) + 50}%)`,
				radius: this.loaderConfig.dotRadius,
				xPos: (window.innerWidth / 2) + value + (this.loaderConfig.dotRadius / 2),
				yPos: this.loaderConfig.yoffset + (
					this.loaderConfig.amplitude * Math.sin(
						(this.loaderConfig.speed * elapsed / Constants.FRAME_CONTRIBUTION)
						+ value
						// + (this.loaderConfig.frequency * val)
						+ this.loaderConfig.basePhase,
					)
				),
			});

			// Second Sine Wave
			this.canvasService.drawDot({
				color: `hsl(241, 30%, ${(index * 2) + 1 + 50}%)`,
				radius: this.loaderConfig.dotRadius,
				xPos: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + value + (this.loaderConfig.dotRadius / 2),
				yPos: this.loaderConfig.yoffset + (
					this.loaderConfig.amplitude * Math.sin(
						(this.loaderConfig.speed * elapsed / Constants.FRAME_CONTRIBUTION)
						+ value
						// + (this.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val))
						+ this.loaderConfig.basePhase
						+ percToPhaseAngle(this.loaderPerc),
					)
				),
			});
		});

		if (this.loaderService.areAllJobsCompleted) {
			this.animationState = AnimationState.RESOLVING;
			window.requestAnimationFrame(this.resolveDots);
		} else {
			window.requestAnimationFrame(this.tick);
		}
	}

	private readonly resolveDots = (timestamp: number): void => {
		if (!this.animStartFrame) {
			this.animStartFrame = timestamp;
		}

		const elapsed = timestamp - this.animStartFrame;

		this.context?.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsPos.forEach((value, index) => {
			// Resolving First Sine Wave
			this.canvasService.drawDot({
				color: `hsl(241, 30%, ${(index * 2) + 50}%)`,
				radius: this.loaderConfig.dotRadius,
				xPos: (window.innerWidth / 2) + value + (this.loaderConfig.dotRadius / 2),
				yPos: this.loaderConfig.yoffset + (
					Math.max(0, this.loaderConfig.amplitude - this.retarder) * Math.sin(
						(this.loaderConfig.speed * elapsed / Constants.FRAME_CONTRIBUTION)
						+ value
						// + this.loaderConfig.frequency * val
						+ this.loaderConfig.basePhase,
					)
				),
			});

			// Resolving Second Sine Wave
			this.canvasService.drawDot({
				color: `hsl(241, 30%, ${(index * 2) + 1 + 50}%)`,
				radius: this.loaderConfig.dotRadius,
				xPos: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + value + (this.loaderConfig.dotRadius / 2),
				yPos: this.loaderConfig.yoffset + (
					Math.max(0, this.loaderConfig.amplitude - this.retarder) * Math.sin(
						(this.loaderConfig.speed * elapsed / Constants.FRAME_CONTRIBUTION)
						+ value
						// + this.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val)
						+ this.loaderConfig.basePhase
						+ percToPhaseAngle(this.loaderPerc),
					)
				),
			});
		});

		this.retarder += this.loaderConfig.retardationRate;

		if (this.retarder > this.loaderConfig.amplitude) {
			this.animationState = AnimationState.STOPPED;
			this.retarder = 0;
			this.loaderService.flushJobs();
		} else {
			window.requestAnimationFrame(this.resolveDots);
		}
	}

	ngAfterViewInit() {
		this.canvasService.setCanvasElement(this.loaderCanvas);

		this.prepareCanvas();

		this.canvasService.canvasContext$.subscribe((context) => {
			this.context = context
		});

		this.loaderService.loadingJobsState$.subscribe(
			(loadingJobsState) => {
				this.loadingJobsState = loadingJobsState;

				const initiationLabels = this.loadingJobsState
					.filter(
						(job) => job.state === LoadingState.LOADING_QUEUED,
					)
					.map(
						(job) => job.label,
					);

				// Only trigger when new labels are found to be queued
				if (Array.isArray(initiationLabels) && initiationLabels.length > 0) {
					this.loaderService.setAnimationStart(initiationLabels);

					// Only triggers when jobs aren"t all loaded and animation is not running
					if (
						!this.loaderService.areAllJobsCompleted
						&& this.animationState === AnimationState.STOPPED
					) {
						this.beginLoadingAnimation();
					}
				}
			},
		);
	}

	public prepareCanvas(): void {
		this.canvasService.refreshContext();

		this.loaderCanvas.nativeElement.width = window.innerWidth;
		this.loaderCanvas.nativeElement.height = window.innerHeight;

		this.loaderConfig = generateLoaderConfig(
			this.loaderCanvas.nativeElement.width,
			this.loaderCanvas.nativeElement.height,
		);

		this.dotsPos = getDotsPos(this.loaderConfig.dotsDist);
	}

	public beginLoadingAnimation(): void {
		this.animationState = AnimationState.RUNNING;

		this.prepareCanvas();

		window.requestAnimationFrame(this.tick);
	}
}
