import type { OnInit } from "@angular/core";
import { Component } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

import type { GithubEvent } from "./github.interface";
import { commitCategoryPattern, githubActionStringMap } from "./github.interface";
import { GithubService } from "./github.service";

type GithubEventUIState = GithubEvent & { expand?: boolean };

@Component({
	selector: "app-update-roll",
	styleUrls: [ "./update-roll.component.scss" ],
	templateUrl: "./update-roll.component.html",
})
export class UpdateRollComponent implements OnInit {
	public readonly Position = Position;
	public readonly commitCategoryPattern = commitCategoryPattern;

	public updates: GithubEventUIState[];

	constructor(private readonly githubService: GithubService) {
		this.githubService.githubFeedState$.subscribe((updates: GithubEventUIState[]) => {
			this.updates = updates;

			this.updates.forEach(
				(update: GithubEventUIState) => {
					update.expand = false;
				},
			);
		});
	}

	ngOnInit() {
		this.githubService.fetchUpdate$();
	}

	public textForAction(actionType: string): string {
		return githubActionStringMap[actionType];
	}

	// TODO: Move this method out of class

	public toggleDetails(entry: GithubEventUIState): void {
		entry.expand = !(entry.expand ?? false);
	}

	public refresh(): void {
		// TODO: Handle updates refresh.
	}

	public loadMore(after: number): void {
		this.githubService.fetchUpdate$(after);
	}
}
