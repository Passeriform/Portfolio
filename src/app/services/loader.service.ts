import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export enum LoadingState {
    LoadingQueued,
    Loading,
    Loaded,
    Finished
}

@Injectable()
export class LoaderService {
  private loadingSource = new BehaviorSubject<LoadingState>(LoadingState.Loading);
  private loadingJobsSource = new BehaviorSubject<number>(0);
  private loadingProgressSource = new BehaviorSubject<number>(0.0);

  loadingState$ = this.loadingSource.asObservable();
  loadingProgressState$ = this.loadingProgressSource.asObservable();

  constructor() { }

  beginLoading() {
    this.loadingSource.next(LoadingState.LoadingQueued);
    this.loadingJobsSource.next(this.loadingJobsSource.value + 1);
  }

  setAnimationStatus(status: LoadingState.Loading | LoadingState.Finished) {
    if (status != LoadingState.Finished || this.loadingJobsSource.value == 0) {
      this.loadingSource.next(status);
    }
  }

  endLoading() {
    this.loadingJobsSource.next(this.loadingJobsSource.value - 1);

    if (this.loadingJobsSource.value == 0) {
      this.loadingSource.next(LoadingState.Loaded);
    };
  }

  setLoadingProgress(progress: number) {
    if (this.loadingSource.value != LoadingState.Loading) {
      this.beginLoading();
    }

    this.loadingProgressSource.next(progress);

    // Auto-unload
    if (progress === 100.0) this.endLoading();
  }
}
