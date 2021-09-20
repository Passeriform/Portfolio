import { Component } from "@angular/core";
import type { OnInit } from "@angular/core";

import type { GithubEvent } from "./github.interface";
import { GithubService } from "./github.service";

type GithubEventUIState = GithubEvent & { expand?: boolean };

@Component({
	selector: "app-update-roll",
	styleUrls: [ "./update-roll.component.scss" ],
	templateUrl: "./update-roll.component.html",
})
export class UpdateRollComponent implements OnInit {
	public updates: (GithubEventUIState)[];

	constructor(private readonly githubService: GithubService) {
		this.githubService.githubFeedState$.subscribe((updates) => {
			this.updates = updates as (GithubEventUIState)[];

			this.updates.forEach(
				(update: GithubEventUIState) => {
					update.expand = false
				},
			);
		});
	}

	ngOnInit() {
		this.githubService.fetchUpdate$();
	}

	public toggleDetails(entry: GithubEventUIState): void {
		entry.expand = !entry?.expand ?? true;
	}

	public refresh(): void {

		// TODO: Handle updates refresh.

	}

	public loadMore(after: number): void {
		this.githubService.fetchUpdate$(after);
	}
}
