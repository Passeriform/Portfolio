import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})
export class ExploreComponent implements OnInit {
  public selectedWork: object;
  public marker: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
  ) {
  }

  ngOnInit() {
    this.marker = this.route.snapshot.data.marker || '';

    this.workService.workSelectedState$.subscribe((entity) => {
      this.selectedWork = entity;
    });
  }
}
