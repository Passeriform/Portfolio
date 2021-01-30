// TODO: Bind progress percentage to observables
// TODO: Required a huge makeover (canvas-style animations do not mesh well with Angular-style ones)
import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';

import { LoadingState, LoadingJob, LoaderService } from '../services/loader.service';

import { drawDot, getDotsPos, getInPhase, generateLoaderConfig } from '../common/canvas-utils';

@Component({
  selector: 'app-harmonic-loader',
  templateUrl: './harmonic-loader.component.html',
  styleUrls: ['./harmonic-loader.component.sass']
})
export class HarmonicLoaderComponent implements AfterViewInit {
  public loadingJobsState: LoadingJob[];
  public loaderPerc: number;

  public animStartFrame: number;
  public retarder = 0;

  // Guard variable (remove for cleanliness later)
  public animationRunning = false;

  public loaderConfig: any;
  public dotsPos: number[];

  public context: CanvasRenderingContext2D;

  @ViewChild('harmonicLoader', { static: true }) loaderCanvas: ElementRef<HTMLCanvasElement>;

  @HostListener('window:resize')
  onResize = () => {
    this.context = this.loaderCanvas.nativeElement.getContext('2d');

    this.loaderCanvas.nativeElement.width = window.innerWidth;
    this.loaderCanvas.nativeElement.height = window.innerHeight;

    this.loaderConfig = generateLoaderConfig(
      this.loaderCanvas.nativeElement.width,
      this.loaderCanvas.nativeElement.height
    );

    this.dotsPos = getDotsPos(this.loaderConfig.dotsDist);
  }

  constructor(private loaderService: LoaderService) {
    this.loaderService.loadingProgressState$.subscribe(
      loadedPercentage => {
        this.loaderPerc = loadedPercentage;
      });

    this.loaderService.loadingJobsState$.subscribe(
      loadingJobsState => {
        this.loadingJobsState = loadingJobsState;

        const initiationLabels = this.loadingJobsState
            .filter(
              (job) => job.state === LoadingState.LoadingQueued
            )
            .map(
              (job) => job.label
            );

        // Only trigger when new labels are found to be queued
        if (Array.isArray(initiationLabels) && initiationLabels.length !== 0) {
          this.loaderService.setAnimationStart(initiationLabels);

          // Only triggers when jobs aren't all loaded and animation is not running
          if (!this.loaderService.areAllJobsCompleted && !this.animationRunning) {
            this.animationRunning = true;
            this.beginLoadingAnimation();
          }
        }

      });
  }

  ngAfterViewInit() {
    this.onResize();
  }

  beginLoadingAnimation = () => {
    this.context = this.loaderCanvas.nativeElement.getContext('2d');

    this.loaderCanvas.nativeElement.width = window.innerWidth;
    this.loaderCanvas.nativeElement.height = window.innerHeight;

    this.loaderConfig = generateLoaderConfig(
      this.loaderCanvas.nativeElement.width,
      this.loaderCanvas.nativeElement.height,
    );

    this.dotsPos = getDotsPos(this.loaderConfig.dotsDist);

    window.requestAnimationFrame(this.tick);
  }

  tick = (timestamp: number) => {
    if (this.animStartFrame === undefined) {
      this.animStartFrame = timestamp;
    }

    const elapsed = timestamp - this.animStartFrame;

    this.context.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

    this.dotsPos.map((val, idx) => {
      // Sine Wave 1
      drawDot({
        context: this.context,
        x: (window.innerWidth / 2) + val + (this.loaderConfig.dotRadius / 2),
        y: this.loaderConfig.yoffset +
            this.loaderConfig.amplitude *
            Math.sin(
              (this.loaderConfig.speed * elapsed) / 10000 +
              val +
              // this.loaderConfig.frequency * val +
              this.loaderConfig.basePhase
            ),
        radius: this.loaderConfig.dotRadius,
        color: `hsl(241, 30%, ${50 + (idx * 2)}%)`
      });

      // Sine Wave 2
      drawDot({
        context: this.context,
        x: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + val + (this.loaderConfig.dotRadius / 2),
        y: this.loaderConfig.yoffset +
            this.loaderConfig.amplitude *
            Math.sin(
              (this.loaderConfig.speed * elapsed) / 10000 +
              val +
              // this.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val) +
              this.loaderConfig.basePhase +
              getInPhase(this.loaderPerc)
            ),
        radius: this.loaderConfig.dotRadius,
        color: `hsl(241, 30%, ${50 + ((idx * 2) + 1)}%)`
      });
    });

    if (this.loaderService.areAllJobsCompleted) {
      window.requestAnimationFrame(this.resolveDots);
    } else {
      window.requestAnimationFrame(this.tick);
    }
  }

  resolveDots = (timestamp: number) => {
    if (this.animStartFrame === undefined) {
      this.animStartFrame = timestamp;
    }

    const elapsed = timestamp - this.animStartFrame;

    this.context.clearRect(0, 0, this.loaderCanvas.nativeElement.width, this.loaderCanvas.nativeElement.height);

    this.dotsPos.map((val, idx) => {
      // Sine Wave 1
      drawDot({
        context: this.context,
        x: (window.innerWidth / 2) + val + (this.loaderConfig.dotRadius / 2),
        y: this.loaderConfig.yoffset +
            Math.max(0, this.loaderConfig.amplitude - this.retarder) *
            Math.sin(
              (this.loaderConfig.speed * elapsed) / 10000 +
              val +
              // this.loaderConfig.frequency * val +
              this.loaderConfig.basePhase
            ),
        radius: this.loaderConfig.dotRadius,
        color: `hsl(241, 30%, ${50 + (idx * 2)}%)`
      });

      // Sine Wave 2
      drawDot({
        context: this.context,
        x: (window.innerWidth / 2) + (this.loaderConfig.dotsDist / 2) + val + (this.loaderConfig.dotRadius / 2),
        y: this.loaderConfig.yoffset +
            Math.max(0, this.loaderConfig.amplitude - this.retarder) *
            Math.sin(
              (this.loaderConfig.speed * elapsed) / 10000 +
              val +
              // this.loaderConfig.frequency * ((this.loaderConfig.dotsDist / 2) + val) +
              this.loaderConfig.basePhase +
              getInPhase(this.loaderPerc)
            ),
        radius: this.loaderConfig.dotRadius,
        color: `hsl(241, 30%, ${50 + ((idx * 2) + 1)}%)`
      });
    });

    this.retarder += this.loaderConfig.retardationRate;

    if (this.retarder < this.loaderConfig.amplitude) {
      window.requestAnimationFrame(this.resolveDots);
    } else {
      this.retarder = 0;
      this.loaderService.flushJobs();
      this.animationRunning = false;
    }
  }
}
