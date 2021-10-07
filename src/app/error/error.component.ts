import { Component, ElementRef, HostBinding, Renderer2, ViewChild } from "@angular/core";
import type { AfterViewInit, OnInit } from "@angular/core";

import type { ApiError, ClientError, HttpErrorCodes } from "./error.interface";
import { ErrorService } from "./error.service";

@Component({
	selector: "app-error",
	styleUrls: [ "./error.component.scss" ],
	templateUrl: "./error.component.html",
})
export class ErrorComponent implements OnInit, AfterViewInit {
	@ViewChild("debugWindow", { read: ElementRef }) private readonly debugWindow: ElementRef<HTMLElement>;

	public error: Record<string, string | HttpErrorCodes> | undefined;
	public debugExpanded: boolean;

	@HostBinding("style.display") public get errorOcurred(): string {
		return this.error ? "block" : "none";
	}

	constructor(
			private readonly renderer: Renderer2,
			private readonly errorService: ErrorService,
	) { }

	ngOnInit() {
		this.errorService.errorDetails$.subscribe((model: ApiError | ClientError) => {
			this.error = model as unknown as Record<string, string | HttpErrorCodes>;
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

	public scrollFired(event: Event): void {
		event.stopPropagation();
	}
}
