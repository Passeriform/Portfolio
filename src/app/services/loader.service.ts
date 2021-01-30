import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum LoadingState {
    LoadingQueued,
    Loading,
    Loaded
}

// TODO: Change array of interface approach to hashmap of interface
export interface LoadingJob {
  readonly label: string;
  state: LoadingState;
  progress: number;
}

@Injectable()
export class LoaderService {
  private loadingJobsSource = new BehaviorSubject<LoadingJob[]>([]);

  loadingJobsState$ = this.loadingJobsSource.asObservable();
  loadingProgressState$ = this.loadingJobsSource.pipe(
    map(
      (jobs) => jobs.reduce((avg: number, job: LoadingJob) => (avg + job.progress) / 2, 0)
    )
  );

  constructor() { }

  bindLoadJob(label: string, observer: Observable<any>) {
    this.beginLoading(label);
    observer.subscribe((_) => this.endLoading(label));
  }

  beginLoading(label: string) {
    const newLoadingJob: LoadingJob = {
      label,
      state: LoadingState.LoadingQueued,
      progress: 0.0
    };

    this.loadingJobsSource.next([...this.loadingJobsSource.value, newLoadingJob]);
  }

  endLoading(label: string) {
    this.loadingJobsSource.next(
      this.loadingJobsSource.value.map((job) => {
        if (job.label === label) {
          job.state = LoadingState.Loaded;
        }

        return job;
      })
    );
  }

  setAnimationStart(labels: string | string[]) {
    // Guard for unnecesssary state updates (Remove if not required)
    if (labels === undefined) {
      return;
    }

    this.loadingJobsSource.next(
      this.loadingJobsSource.value.map((job) => {
        if (typeof labels === 'string') {
          if (job.label === labels) {
            job.state = LoadingState.Loading;
          }
        } else {
          if (labels.includes(job.label)) {
            job.state = LoadingState.Loading;
          }
        }

        return job;
      })
    );
  }

  flushJobs(labels?: string | string[]) {
    // Flush all jobs if no label supplied (SQL-style)
    if (labels === undefined || (Array.isArray(labels) && labels.length === 0)) {
      this.loadingJobsSource.next([]);
      return;
    }

    this.loadingJobsSource.next(
      this.loadingJobsSource.value.filter((job) => {
        if (typeof labels === 'string') {
          return job.label === labels;
        } else {
          return labels.includes(job.label);
        }
      })
    );
  }

  get areAllJobsCompleted(): boolean {
    for (const job of this.loadingJobsSource.value) {
      if (job.state !== LoadingState.Loaded) {
        return false;
      }
    }

    return true;
    // return this.loadingJobsSource.value.length === 0;
  }

  setLoadingProgress(label: string, progress: number) {
    this.loadingJobsSource.value.map((job) => {
      if (job.label === label) {
        if (job.progress !== LoadingState.Loading) {
          this.beginLoading(job.label);

          job.progress = progress;
        }

        // Auto-unload
        if (job.progress === 100.0) {
          this.flushJobs(job.label);
        }
      }
    });
  }

  bindLoadingProgress(label: string, progressObs: Observable<number>) {
    progressObs.subscribe((progress) => {
      this.setLoadingProgress(label, progress);
    });
  }
}
