import { Component, OnInit, Input, AfterViewInit, HostBinding, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ErrorModel } from './error.interface';
import { ErrorService } from './error.service';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.sass'],
})
export class ErrorComponent implements OnInit, AfterViewInit {
	public error: ErrorModel;
	public debugExpanded: boolean;

	@ViewChild('debugWindow') debugWindow: ElementRef;

	@HostBinding('style.display') get errorOcurred() {
		return this.error ? 'block' : 'none';
	}
	constructor(
		private renderer: Renderer2,
		private errorService: ErrorService
	) {
		this.renderer.listen('window', 'click', (e: Event) => {
			if (!this.debugWindow.nativeElement.contains(e.target)) {
				this.debugExpanded = false;
			}
		});
	}

	ngOnInit() {
		this.errorService.errorDetails$.subscribe((model) => {
			this.error = model;
		});
	}

	ngAfterViewInit() { }

	debugExpand() {
		this.debugExpanded = true;
	}
}
