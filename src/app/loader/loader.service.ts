import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Progress } from "./loader.config";
import { LoadingState } from "./loader.interface";

// TODO: Change array of interface approach to hashmap of interface

export interface LoadingJob {
	readonly label: string;
	progress: number;
	state: LoadingState;
}

@Injectable()
export class LoaderService {
	private loadingJobs: readonly LoadingJob[];

	private readonly loadingJobsSource$ = new BehaviorSubject<readonly LoadingJob[]>([]);

	public readonly loadingJobsState$: Observable<readonly LoadingJob[]> = this.loadingJobsSource$.asObservable();

	public readonly loadingProgressState$: Observable<number> = this.loadingJobsSource$.pipe(
		map(
			(jobs) => jobs.reduce((sum: number, job: LoadingJob) => sum + job.progress, 0) / jobs.length,
		),
	);

	constructor() {
		this.loadingJobsSource$.subscribe((loadingJobs: readonly LoadingJob[]) => {
			this.loadingJobs = loadingJobs;
		});
	}

	public bindLoadJob(label: string, job$: Observable<boolean>): void {
		this.beginLoading(label);
		job$.subscribe((value) => {
			if (value) {
				this.endLoading(label);
			}
		});
	}

	public beginLoading(label: string): void {
		const loadingJob: LoadingJob = {
			label,
			progress: Progress.INIT,
			state: LoadingState.LOADING_QUEUED,
		};

		this.loadingJobsSource$.next([
			...this.loadingJobs,
			loadingJob,
		]);
	}

	public endLoading(label: string): void {
		this.loadingJobsSource$.next(
			this.loadingJobs.map((job) => {
				if (job.label === label) {
					job.state = LoadingState.LOADED;
				}

				return job;
			}),
		);
	}

	public setAnimationStart(labels: string | readonly string[]): void {
		// NOTE: Guard for unnecesssary state updates (Remove if not required)
		if (!labels) {
			return;
		}

		this.loadingJobsSource$.next(
			this.loadingJobs.map((job) => {
				if (typeof labels === "string" && job.label === labels) {
					job.state = LoadingState.LOADING;
				} else if (labels.includes(job.label)) {
					job.state = LoadingState.LOADING;
				}

				return job;
			}),
		);
	}

	public flushJobs(labels?: string | readonly string[]): void {
		// Flush all jobs if no label supplied
		if (!labels || (Array.isArray(labels) && labels.length === 0)) {
			// If value not truthy or labels is an empty array
			this.loadingJobsSource$.next([]);

			return;
		}

		this.loadingJobsSource$.next(
			this.loadingJobs.filter((job) => {
				if (typeof labels === "string") {
					return job.label === labels;
				}

				return labels.includes(job.label);
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
		this.loadingJobs.forEach((job) => {
			if (job.label === label) {
				if (job.progress !== LoadingState.LOADING) {
					this.beginLoading(job.label);

					job.progress = progress;
				}

				// Auto-unload
				if (job.progress === Progress.COMPLETE) {
					this.flushJobs(job.label);
				}
			}
		});
	}

	public bindLoadingProgress(label: string, jobProgress$: Observable<number>): void {
		jobProgress$.subscribe((progress) => {
			this.setLoadingProgress(label, progress);
		});
	}
}
