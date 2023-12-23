import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

import { environment } from "@env/environment";

import type { GithubEvent } from "../models/github.interface";

@Injectable()
export class GithubService {
	private readonly githubFeedSource$ = new BehaviorSubject<readonly GithubEvent[]>([]);

	public readonly githubFeedState$: Observable<readonly GithubEvent[]> = this.githubFeedSource$.asObservable();

	constructor(private readonly http: HttpClient) { }

	// TODO: Justify usage of after parameter

	public refreshFeed(after?: number): void {
		this.http
			.get<readonly GithubEvent[]>(environment.githubEventsApiUrl)
			.subscribe((model: GithubEvent[]) => {
				this.githubFeedSource$.next(model);
			});
	}
}
