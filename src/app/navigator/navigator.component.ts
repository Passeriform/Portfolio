import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';

@Component({
	selector: 'app-navigator',
	templateUrl: './navigator.component.html',
	styleUrls: ['./navigator.component.sass'],
})
export class NavigatorComponent implements AfterViewInit {

	public expanded = false;

	@ViewChild('clickCapture', { read: ElementRef }) captureElement: ElementRef;

	constructor() { }

	ngAfterViewInit() { }

	expand(event) {
		if (!this.expanded) {
			this.expanded = !this.expanded;
		} else {
			const target = event.target || event.srcElement || event.currentTarget;
			if (target === this.captureElement.nativeElement) {
				this.expanded = !this.expanded;
			}
		}
	}
}
