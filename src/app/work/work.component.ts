import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '@app/core/services/loader.service';
import { WorkModel } from './work.interface';
import { WorkService } from './services/work.service';

@Component({
	selector: 'app-work',
	templateUrl: './work.component.html',
	styleUrls: ['./work.component.sass'],
})
export class WorkComponent implements OnInit, AfterViewInit {
	public model: WorkModel[];
	public selected: WorkModel;
	public marker: string;

	constructor(
		private workService: WorkService,
		private loaderService: LoaderService,
		private route: ActivatedRoute,
	) {
		// this.loaderService.flushJobs();
		this.loaderService.beginLoading('[page] load');
	}

	ngOnInit() {
		this.loaderService.beginLoading('[http] work');

		this.route.data.subscribe(
			(data: { model: WorkModel[] }) => {
				this.loaderService.endLoading('[http] work');
				this.model = data.model;
			}
		);

		this.workService.workSelectedState$.subscribe((entity) => {
			this.selected = entity;
		});
	}

	ngAfterViewInit() {
		this.loaderService.endLoading('[page] load');
	}
}
