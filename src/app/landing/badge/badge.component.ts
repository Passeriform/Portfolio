import { Component, Input } from "@angular/core";
import type { OnInit } from "@angular/core";

@Component({
	selector: "app-badge",
	styleUrls: [ "./badge.component.scss" ],
	templateUrl: "./badge.component.html",
})
export class BadgeComponent implements OnInit {
	@Input() public readonly name: string;

	ngOnInit() {
		// ngOnInit
	}
}
