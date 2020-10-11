import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkStateService } from '../services/work-state.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})
export class ExploreComponent implements OnInit {
  public selectedWork: object;

  private marker: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workState: WorkStateService
  ) {
    this.workState.workSelectedState$.subscribe((entity) => {
      this.selectedWork = entity;
    });
  }

  ngOnInit() {
    this.marker = this.route.snapshot.data.marker || '';
  }
}