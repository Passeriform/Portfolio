import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

import type { GithubEvent } from "./github.interface";

@Injectable()
export class GithubService {
	private readonly githubFeedSource$ = new BehaviorSubject<readonly GithubEvent[]>([]);

	public readonly githubFeedState$: Observable<readonly GithubEvent[]> = this.githubFeedSource$.asObservable();

	constructor(private readonly http: HttpClient) { }

	// TODO: Justify usage of after parameter

	public fetchUpdate$(after?: number): Observable<readonly GithubEvent[]> {
		this.http
			.get<readonly GithubEvent[]>("https://api.github.com/users/Passeriform/events")
			.subscribe((model: GithubEvent[]) => {
				this.githubFeedSource$.next(model);
			});

		return this.githubFeedState$;
	}
}
