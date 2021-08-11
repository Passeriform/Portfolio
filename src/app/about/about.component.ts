import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AboutModel } from './models/about.interface';
import { LoaderService } from '../core/services/loader.service';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit, AfterViewInit {
	public model: AboutModel;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly loaderService: LoaderService
	) {
		// TODO: Improve this loader flushing
		// this.loaderService.flushJobs();
		this.loaderService.beginLoading('[page] load');
	}

	ngOnInit() {
		this.route.data.subscribe(
			(data: { model: AboutModel }) => {
				this.model = data.model;
			}
		);
	}

	ngAfterViewInit() {
		this.loaderService.endLoading('[page] load');
	}
}
