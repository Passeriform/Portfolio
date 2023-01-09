import { Component, ElementRef, HostBinding, HostListener, ViewChild } from "@angular/core";

// TODO: Move to separate navigator module.

// TODO: Rename to `terminal`.

// TODO: Add expand on typing colon, like vim.

// TODO: Add commands config.

@Component({
	selector: "app-navigator",
	styleUrls: [ "./navigator.component.scss" ],
	templateUrl: "./navigator.component.html",
})
export class NavigatorComponent {
	public expanded = false;

	@ViewChild("clickCapture", { read: ElementRef }) public readonly captureElement: ElementRef;

	@HostListener("mousedown", [ "$event" ])
	public onMousedown(event: MouseEvent): void {
		if (this.expanded) {
			const target = event.target ?? event.currentTarget;
			if (target === this.captureElement.nativeElement) {
				this.expanded = !this.expanded;
			}
		} else {
			this.expanded = !this.expanded;
		}
	}

	@HostBinding("class.expanded")
	public get isExpanded(): boolean {
		return this.expanded;
	}
}
