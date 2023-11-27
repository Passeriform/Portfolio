import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import { LoadingState, ProgressCheckpoint } from "../models/loader.interface";

// TODO: Change array of interface approach to hashmap of interface

export type LoadingJob = {
	readonly label: string;
	progress: number;
	state: LoadingState;
}

@Injectable()
export class LoaderService {
	// TODO: Convert this local subscribe to chained observables
	private loadingJobs: readonly LoadingJob[];
	private readonly loadingJobsSource$ = new BehaviorSubject<readonly LoadingJob[]>([]);

	public readonly loadingJobsState$: Observable<readonly LoadingJob[]> = this.loadingJobsSource$.asObservable();
	public readonly loadingProgressState$: Observable<number> = this.loadingJobsSource$.pipe(
		map(
			(jobs: readonly LoadingJob[]) => jobs.reduce((sum: number, job: LoadingJob) => sum + job.progress, 0) / jobs.length,
		),
	);

	constructor() {
		this.loadingJobsSource$.subscribe((loadingJobs: readonly LoadingJob[]) => {
			this.loadingJobs = loadingJobs;
		});
	}

	public beginLoading(label: string): void {
		const loadingJob: LoadingJob = {
			label,
			progress: ProgressCheckpoint.INIT,
			state: LoadingState.LOADING_QUEUED,
		};

		this.loadingJobsSource$.next([
			...this.loadingJobs,
			loadingJob,
		]);
	}

	public bindLoadingProgress(label: string, jobProgress$: Observable<number>): void {
		jobProgress$.subscribe((progress: number) => {
			this.setLoadingProgress(label, progress);
		});
	}

	public bindLoadJob(label: string, job$: Observable<boolean>): void {
		this.beginLoading(label);
		job$.subscribe((value: boolean) => {
			if (value) {
				this.endLoading(label);
			}
		});
	}

	public endLoading(label: string): void {
		this.loadingJobsSource$.next(
			this.loadingJobs.map((job: LoadingJob) => {
				if (job.label === label) {
					job.progress = ProgressCheckpoint.COMPLETE;
					job.state = LoadingState.LOADED;
				}

				return job;
			}),
		);
	}

	public flushJobs(labels?: string | readonly string[]): void {
		// Flush all jobs if no label supplied
		if (labels === undefined || (Array.isArray(labels) && labels.length === 0)) {
			// If value not truthy or labels is an empty array
			this.loadingJobsSource$.next([]);

			return;
		}

		this.loadingJobsSource$.next(
			this.loadingJobs.filter((job: LoadingJob) => {
				if (typeof labels === "string") {
					return job.label === labels;
				}

				return labels.includes(job.label);
			}),
		);
	}

	public setAnimationStart(labels: string | readonly string[]): void {
		this.loadingJobsSource$.next(
			this.loadingJobs.map((job: LoadingJob) => {
				if (typeof labels === "string" && job.label === labels) {
					job.state = LoadingState.LOADING;
				} else if (labels.includes(job.label)) {
					job.state = LoadingState.LOADING;
				}

				return job;
			}),
		);
	}

	public get areAllJobsCompleted(): boolean {
		if (this.loadingJobs.some((job: LoadingJob) => job.state !== LoadingState.LOADED)) {
			return false;
		}

		return true;
		// return !this.loadingJobs.length;
	}

	public setLoadingProgress(label: string, progress: number): void {
		this.loadingJobsSource$.next(
			this.loadingJobs.map((job: LoadingJob) => {
				if (job.label === label) {
					job.progress = progress;
					if (job.progress === ProgressCheckpoint.COMPLETE) {
						job.state = LoadingState.LOADED;
					}
				}

				return job;
			}),
		);
	}
}
