import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WorkModel } from './work.interface';

import { LoaderService } from '../services/loader.service';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  public selectedWork: WorkModel;
  public marker: string;

  constructor(
    private route: ActivatedRoute,
    private workService: WorkService,
    private loaderService: LoaderService,
  ) {
    // this.loaderService.flushJobs();
    this.loaderService.beginLoading('[page] load');
  }

  ngOnInit() {
    this.marker = this.route.snapshot.data.marker || '';

    this.workService.workSelectedState$.subscribe((entity) => {
      this.selectedWork = entity;
    });
  }

  ngAfterViewInit() {
    this.loaderService.endLoading('[page] load');
  }
}
