import { Component, OnInit, AfterViewInit } from '@angular/core';

import { LoadingState, LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass'],
})

export class LandingComponent implements OnInit, AfterViewInit {
  constructor(private loaderService: LoaderService) {
    this.loaderService.beginLoading("[page] load");
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.loaderService.endLoading("[page] load");
  }
}
