import type { OnInit } from "@angular/core";
import { Component, ElementRef, HostBinding, HostListener, ViewChild } from "@angular/core";

import type { ApiError, ClientError, HttpErrorCodes } from "./error.interface";
import { ErrorService } from "./error.service";

@Component({
	selector: "app-error",
	styleUrls: [ "./error.component.scss" ],
	templateUrl: "./error.component.html",
})
export class ErrorComponent implements OnInit {
	@ViewChild("debugWindow", { read: ElementRef }) private readonly debugWindow: ElementRef<HTMLElement>;

	public error: Record<string, HttpErrorCodes | string> | undefined;
	public debugExpanded: boolean;

	@HostListener("document:click", [ "$event" ]) public onDocumentClick(): void {
		if (!this.debugWindow) {
			return;
		}

		if (!this.debugWindow.nativeElement.contains(event?.target as Node)) {
			this.debugExpanded = false;
		}
	}

	@HostBinding("style.display") public get errorOcurred(): string {
		return this.error ? "block" : "none";
	}

	constructor(private readonly errorService: ErrorService) { }

	ngOnInit() {
		this.errorService.errorDetails$.subscribe((model: ApiError | ClientError) => {
			this.error = model as unknown as Record<string, HttpErrorCodes | string>;
		});
	}

	public debugExpand(): void {
		this.debugExpanded = true;
	}

	public scrollFired(event: Event): void {
		event.stopPropagation();
	}
}
