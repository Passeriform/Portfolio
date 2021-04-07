import { Component, OnInit, AfterViewInit, Input, HostBinding, TemplateRef } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.sass'],
})
export class TooltipComponent implements OnInit, AfterViewInit {
	@HostBinding('class.show') showToggle: boolean;

	@Input() positionType: string;
	@Input() callerInstance: HTMLElement;
	@Input() showObs: Observable<boolean>;
	@Input() public darkMode: boolean;
	@Input() public tooltipTemplate: TemplateRef<any>;

	@HostBinding('class.top')
	get isTop(): boolean {
		return this.positionType === 'top';
	}

	@HostBinding('class.bottom')
	get isBottom(): boolean {
		return this.positionType === 'bottom';
	}

	@HostBinding('style.top.px')
	get topFix(): number {
		return this.callerInstance.getBoundingClientRect().top + this.callerInstance.getBoundingClientRect().height / 2;
	}

	@HostBinding('style.left.px')
	get leftFix(): number {
		return this.callerInstance.getBoundingClientRect().left + this.callerInstance.getBoundingClientRect().width / 2;
	}

	constructor() { }

	ngOnInit() {
		this.showObs.subscribe((toggle: boolean) => {
			this.showToggle = toggle;
		});
	}

	ngAfterViewInit() { }
}
