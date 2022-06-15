// TODO: Bind progress percentage to observables

// TODO: Required a huge makeover (canvas-style animations do not mesh well with Angular-style ones)

import type { AfterViewInit } from "@angular/core";
import { Component, ElementRef, HostBinding, HostListener, ViewChild } from "@angular/core";

import { CanvasService } from "@core/services/canvas.service";
import { LoadingState } from "../loader.interface";
import { Constants, generateLoaderConfig } from "./harmonic-loader.config";
import type { HarmonicLoaderConfig } from "./harmonic-loader.interface";
import { percToPhaseAngle } from "./harmonic-loader.helper";
import type { LoadingJob } from "../loader.service";
import { LoaderService } from "../loader.service";
import { LoaderComponent } from "../loader.component";
import { AnimationState } from "../loader.config";

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

	public retarder: number = Constants.DEFAULT_RETARDER;
	public animStartFrame: number;
	public context?: CanvasRenderingContext2D;
	public dotsXPos: readonly number[];
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

	private getDotsXPos(splitDist: number): readonly number[] {
		const dotsCount: number = Math.floor(window.innerWidth / splitDist);
		const splitLocs: readonly number[] = Array.from({ length: dotsCount })
			.fill(0)
			.map(
				(_, index: number) => splitDist * (index - ((dotsCount - 0.5) / 2)),
			);

		return splitLocs;
	};

	private drawSineDot(
		amplitude: number,
		dotXPos: number,
		time: number,
		phi: number,
		color: string
	) {
		const radius = this.loaderConfig.dotRadius
		const wt = (this.loaderConfig.angularFrequency * (time / Constants.FRAME_CONTRIBUTION))
		const yOffset = this.loaderConfig.yoffset
		// center +- dot position + top left of dot
		const xPos = (window.innerWidth / 2) + dotXPos + (this.loaderConfig.dotRadius / 2)
		const kx = this.loaderConfig.waveNumber * dotXPos
		const yPos = yOffset + (amplitude * Math.sin(kx - wt + phi))

		// Resolving First Sine Wave
		this.canvasService.drawDot({ radius, xPos, yPos, color });
	}

	private getElapsedTime(timestamp: number): number {
		if (!this.animStartFrame) {
			this.animStartFrame = timestamp;
		}

		return timestamp - this.animStartFrame;
	}

	private readonly tick = (timestamp: number): void => {
		const elapsed: number = this.getElapsedTime(timestamp);

		this.context?.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsXPos.forEach((dotXPos: number, index: number) => {
			this.drawSineDot(this.loaderConfig.amplitude, dotXPos, elapsed, this.loaderConfig.basePhase, `hsl(241, 30%, ${(index * 2) + 50}%)`);
			this.drawSineDot(this.loaderConfig.amplitude, dotXPos + (this.loaderConfig.dotsDist / 2), elapsed, this.loaderConfig.basePhase + percToPhaseAngle(this.loaderPerc), `hsl(241, 30%, ${(index * 2) + 1 + 50}%)`);
		});

		if (this.loaderService.areAllJobsCompleted) {
			this.animationState = AnimationState.RESOLVING;
			window.requestAnimationFrame(this.resolveDots);
		} else {
			window.requestAnimationFrame(this.tick);
		}
	};

	private readonly resolveDots = (timestamp: number): void => {
		const elapsed: number = this.getElapsedTime(timestamp);

		this.context?.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

		this.dotsXPos.forEach((dotXPos: number, index: number) => {
			this.drawSineDot(Math.max(0, this.loaderConfig.amplitude - this.retarder), dotXPos, elapsed, this.loaderConfig.basePhase, `hsl(241, 30%, ${(index * 2) + 50}%)`);
			this.drawSineDot(Math.max(0, this.loaderConfig.amplitude - this.retarder), dotXPos + (this.loaderConfig.dotsDist / 2), elapsed, this.loaderConfig.basePhase + percToPhaseAngle(this.loaderPerc), `hsl(241, 30%, ${(index * 2) + 1 + 50}%)`);
		});

		this.retarder += this.loaderConfig.retardationRate;

		if (this.retarder > this.loaderConfig.amplitude) {
			this.animationState = AnimationState.STOPPED;
			this.retarder = 0;
		} else {
			window.requestAnimationFrame(this.resolveDots);
		}
	};

	ngAfterViewInit() {
		this.canvasService.setCanvasElement(this.loaderCanvas);

		this.prepareCanvas();

		this.canvasService.canvasContext$.subscribe((context) => {
			this.context = context;
		});

		this.loaderService.loadingJobsState$.subscribe(
			(loadingJobsState) => {
				this.loadingJobsState = loadingJobsState;

				const initiationLabels: string[] = this.loadingJobsState
					.filter(
						(job: LoadingJob) => job.state === LoadingState.LOADING_QUEUED,
					)
					.map(
						(job: LoadingJob) => job.label,
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

		this.dotsXPos = this.getDotsXPos(this.loaderConfig.dotsDist);
	}

	public beginLoadingAnimation(): void {
		this.animationState = AnimationState.RUNNING;

		this.prepareCanvas();

		window.requestAnimationFrame(this.tick);
	}
}
