import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderService } from '../services/loader.service';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})

export class ExploreComponent implements OnInit, AfterViewInit {
  public selectedWork: object;
  public marker: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
    private loaderService: LoaderService,
  ) {
    // this.loaderService.flushJobs();
    this.loaderService.beginLoading("[page] load");
  }

  ngOnInit() {
    this.marker = this.route.snapshot.data.marker || '';

    this.workService.workSelectedState$.subscribe((entity) => {
      this.selectedWork = entity;
    });
  }

  ngAfterViewInit() {
    this.loaderService.endLoading("[page] load");
  }
}
