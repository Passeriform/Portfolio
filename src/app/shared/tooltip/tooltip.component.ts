import type { AfterViewInit, OnInit, TemplateRef } from "@angular/core";
import { Component, HostBinding, Input } from "@angular/core";

import type { Observable } from "rxjs";

@Component({
	selector: "app-tooltip",
	styleUrls: [ "./tooltip.component.scss" ],
	templateUrl: "./tooltip.component.html",
})
export class TooltipComponent implements OnInit, AfterViewInit {
	@Input() public positionType: string;
	@Input() public callerInstance: HTMLElement;
	@Input() public showObs$: Observable<boolean>;
	@Input() public darkMode: boolean;
	@Input() public tooltipTemplate: TemplateRef<any>;

	@HostBinding("class.show") public showToggle: boolean;

	@HostBinding("class.top")
	public get isTop(): boolean {
		return this.positionType === "top";
	}

	@HostBinding("class.bottom")
	public get isBottom(): boolean {
		return this.positionType === "bottom";
	}

	@HostBinding("style.top.px")
	public get topFix(): number {
		/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
		return this.callerInstance.getBoundingClientRect().top + (this.callerInstance.getBoundingClientRect().height / 2);
	}

	@HostBinding("style.left.px")
	public get leftFix(): number {
		/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
		return this.callerInstance.getBoundingClientRect().left + (this.callerInstance.getBoundingClientRect().width / 2);
	}

	ngOnInit() {
		this.showObs$.subscribe((toggle: boolean) => {
			this.showToggle = toggle;
		});
	}

	ngAfterViewInit() {
		// ngAfterViewInit
	}
}
