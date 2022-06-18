import type { OnInit } from "@angular/core";
import { Component, Input } from "@angular/core";

// import { WikiPipe } from "@shared/pipes/wiki.pipe";

@Component({
	selector: "app-tech-stack",
	styleUrls: [ "./tech-stack.component.scss" ],
	templateUrl: "./tech-stack.component.html",
})
export class TechStackComponent implements OnInit {
	@Input() public readonly model: readonly Record<string, unknown>[];

	public readonly tooltipShownFor: string;

	ngOnInit() {
		// ngOnInit
	}
}
