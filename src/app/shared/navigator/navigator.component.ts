import { Component, ElementRef, ViewChild } from "@angular/core";

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
