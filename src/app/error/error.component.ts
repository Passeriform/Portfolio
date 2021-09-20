import { Component, HostBinding, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import type { AfterViewInit, OnInit } from "@angular/core";

import type { ErrorModel } from "./error.interface";
import { ErrorService } from "./error.service";

@Component({
	selector: "app-error",
	styleUrls: [ "./error.component.scss" ],
	templateUrl: "./error.component.html",
})
export class ErrorComponent implements OnInit, AfterViewInit {
	@ViewChild("debugWindow", { read: ElementRef }) private readonly debugWindow: ElementRef<HTMLElement>;

	public error: ErrorModel;

	public debugExpanded: boolean;

	@HostBinding("style.display") public get errorOcurred(): string {
		return this.error ? "block" : "none";
	}

	constructor(
			private readonly renderer: Renderer2,
			private readonly errorService: ErrorService,
	) { }

	ngOnInit() {
		this.errorService.errorDetails$.subscribe((model: ErrorModel) => {
			this.error = model;
		});
	}

	ngAfterViewInit() {
		this.renderer.listen("window", "click", (event: Event) => {
			if (!this.debugWindow?.nativeElement?.contains(event.target as Node)) {
				this.debugExpanded = false;
			}
		});
	}

	public debugExpand(): void {
		this.debugExpanded = true;
	}
}
