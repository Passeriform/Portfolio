import { Component, ElementRef, ViewChild } from "@angular/core";

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
	@ViewChild("clickCapture", { read: ElementRef }) public readonly captureElement: ElementRef;

	public expanded = false;

	public expand(event: MouseEvent): void {
		if (this.expanded) {
			const target = event.target ?? event.currentTarget;
			if (target === this.captureElement.nativeElement) {
				this.expanded = !this.expanded;
			}
		} else {
			this.expanded = !this.expanded;
		}
	}
}
