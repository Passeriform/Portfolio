import { Component, OnInit } from '@angular/core';

import { GithubEvent } from '../common/github.interface';

import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-update-roll',
  templateUrl: './update-roll.component.html',
  styleUrls: ['./update-roll.component.sass']
})
export class UpdateRollComponent implements OnInit {
  public updates: Array<GithubEvent & { expand: boolean }>;

  constructor(private githubService: GithubService) {
    this.githubService.githubFeedState$.subscribe((updates) => {
      this.updates = updates as Array<GithubEvent & { expand: boolean }>;

      this.updates.forEach(update => {
        update.expand = false;
      });

    });
  }

  ngOnInit() {
    this.githubService.fetchUpdates();
  }

  refresh(): void { }

  loadMore(after: number): void {
    this.githubService.fetchUpdates(after);
  }

  toggleDetails(entry: GithubEvent & { expand: boolean }): void {
    entry.expand = !entry.expand ?? true;
  }
}
