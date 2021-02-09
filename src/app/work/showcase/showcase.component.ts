import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { WorkModel } from '../work.interface';

import { WorkService } from '../services/work.service';

@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrls: ['./showcase.component.sass'],
})
export class ShowcaseComponent implements OnInit {
	public model: WorkModel[];
	public windowHeight: number;

	@ViewChild('cardscroller') cardChild: ElementRef;

	@HostListener('window:resize')
	onResize() {
		this.windowHeight = window.innerHeight / parseFloat(
			getComputedStyle(
				document.querySelector('body')
			)['font-size']
		);
	}

	constructor(
		private router: Router,
		public workService: WorkService
	) {
		this.windowHeight = window.innerHeight / parseFloat(
			getComputedStyle(
				document.querySelector('body')
			)['font-size']
		);
	}

	ngOnInit() {
		this.workService.workActiveState$.subscribe((model) => {
			this.model = model;
		});
	}

	setSelected(entry: WorkModel): void {
		this.workService.setSelected(entry);
	}

	cancelClick(event: MouseEvent): void {
		event.stopPropagation();
	}
}
