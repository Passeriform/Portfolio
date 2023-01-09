import type { OnInit } from "@angular/core";
import { Component } from "@angular/core";

import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Position } from "@shared/models/cardinals.interface";

import type { GithubEvent } from "./models/github.interface";
import { commitCategoryPattern, githubActionPresentation, isActionEvent, isPushEvent } from "./models/github.interface";
import { GithubService } from "./services/github.service";

type GithubEventUIState = GithubEvent & { expand?: boolean };

@Component({
	selector: "app-update-roll",
	styleUrls: [ "./update-roll.component.scss" ],
	templateUrl: "./update-roll.component.html",
})
export class UpdateRollComponent implements OnInit {
	public readonly actionPresentation = githubActionPresentation;
	public readonly commitCategoryPattern = commitCategoryPattern;
	public readonly isActionEvent = isActionEvent;
	public readonly isPushEvent = isPushEvent;
	public readonly Position = Position;

	public updates$: Observable<GithubEventUIState[]>;

	constructor(private readonly githubService: GithubService) {
		this.updates$ = this.githubService.githubFeedState$.pipe(
			map((updates: GithubEventUIState[]) => updates.map(
				(update: GithubEventUIState) => ({ ...update, expand: false }),
			)),
		);
	}

	ngOnInit() {
		this.githubService.fetchUpdate$();
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
