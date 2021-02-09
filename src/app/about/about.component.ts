import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { LoaderService } from '../core/services/loader.service';

import { AboutModel } from './models/about.interface';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit, AfterViewInit {
	public model: AboutModel;

	constructor(
		private route: ActivatedRoute,
		private loaderService: LoaderService
	) {
		// TODO: Improve this loader flushing
		// this.loaderService.flushJobs();
		this.loaderService.beginLoading('[page] load');
	}

	ngOnInit() {
		this.loaderService.beginLoading('[http] about');

		this.route.data.subscribe(
			(data: { model: AboutModel }) => {
				this.model = data.model;

				this.loaderService.endLoading('[http] about');
			}
		);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading('[page] load');
	}
}
