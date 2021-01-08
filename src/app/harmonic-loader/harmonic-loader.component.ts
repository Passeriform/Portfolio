// TODO: Remove retarder
import { Component, ElementRef, AfterViewInit, ViewChild, HostListener, HostBinding } from '@angular/core';

import { LoadingState, LoaderService } from '../services/loader.service';

import { drawDot, getDotsPos, getInPhase, generateLoaderConfig } from '../common/canvas-utils';

@Component({
  selector: 'app-harmonic-loader',
  templateUrl: './harmonic-loader.component.html',
  styleUrls: ['./harmonic-loader.component.sass']
})
export class HarmonicLoaderComponent implements AfterViewInit {
  private LoadingState = LoadingState;

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

  public loadingState: LoadingState;
  public loaderPerc: number;

  public animStartFrame: number;
  public retarder = 0;

  public loaderConfig: any;
  public dotsPos: number[];

  public context: CanvasRenderingContext2D;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loadingState$.subscribe(
      loadingState => {
        this.loadingState = loadingState;

        if (this.loadingState == LoadingState.LoadingQueued) {
          this.loaderService.setAnimationStatus(LoadingState.Loading);
          this.beginLoadingAnimation();
        }
      });

    this.loaderService.loadingProgressState$.subscribe(
      loadedPercentage => {
        this.loaderPerc = loadedPercentage;
      });
  }

  ngAfterViewInit() { }

  beginLoadingAnimation = () => {
    this.loaderService.setAnimationStatus(LoadingState.Loading);

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

  tick = (timestamp) => {
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

    if (this.loadingState === LoadingState.Loaded) {
      window.requestAnimationFrame(this.resolveDots);
    } else {
      window.requestAnimationFrame(this.tick);
    }
  }

  resolveDots = (timestamp) => {
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

    if (this.retarder < this.loaderConfig.amplitude) window.requestAnimationFrame(this.resolveDots);
    else {
      this.retarder = 0;
      this.cleanupLoader();
    }
  }

  cleanupLoader = () => {
    this.loaderService.setAnimationStatus(LoadingState.Finished);
  }
}
