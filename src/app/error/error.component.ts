import { DOCUMENT } from "@angular/common";
import type { OnInit } from "@angular/core";
import { Component, ElementRef, HostBinding, HostListener, Inject, ViewChild } from "@angular/core";
import { stopClickPropagation } from "@utility/events";

import type { ApiError, ClientError, HttpErrorCodes } from "./models/error.interface";
import { ErrorService } from "./services/error.service";

@Component({
	selector: "app-error",
	styleUrls: [ "./error.component.scss" ],
	templateUrl: "./error.component.html",
})
export class ErrorComponent implements OnInit {
	@ViewChild("debugWindow", { read: ElementRef }) private readonly debugWindow: ElementRef<HTMLElement> | undefined;

	public debugExpanded: boolean;
	public error: Record<string, HttpErrorCodes | string> | undefined;
	public scrollFired: (clickEvent: MouseEvent) => void = stopClickPropagation;

	@HostListener("document:mousedown", [ "$event" ])
	@HostListener("document:keydown", [ "$event" ])
	public onDocumentClick(clickEvent: KeyboardEvent | MouseEvent): void {
		if (!this.debugWindow) {
			return;
		}

		this.debugExpanded = this.debugWindow.nativeElement.contains(clickEvent.target as Node)
			? !this.debugExpanded
			: false;
	}

	@HostBinding("class.show")
	public get errorOcurred(): boolean {
		return Boolean(this.error);
	}

	constructor(
			@Inject(DOCUMENT) public readonly document: HTMLElement,
			private readonly errorService: ErrorService,
	) { }

	ngOnInit() {
		this.errorService.errorDetails$.subscribe((model: ApiError | ClientError) => {
			this.error = model as unknown as Record<string, HttpErrorCodes | string>;
		});
	}
}
