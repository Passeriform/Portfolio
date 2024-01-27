import { Component, Input } from "@angular/core";
import { AsyncPipe, KeyValuePipe, NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import type { SafeUrl } from "@angular/platform-browser";
import { DomSanitizer } from "@angular/platform-browser";

import { Position } from "@shared/models/cardinals.interface";
import { WikiPipe } from "@shared/pipes/wiki.pipe";
import { UnionArrayPipe } from "@shared/pipes/union-array.pipe";
import { TooltipDirective } from "@shared/tooltip/directives/tooltip.directive";
import { CageGridDirective } from "@shared/cage-grid/directives/cage-grid.directive";
import { CageGridComponent } from "@shared/cage-grid/cage-grid.component";
import type { Entity_Type } from "@graphql/generated/schema";

import type { WorkModel } from "../models/work.interface";

@Component({
	imports: [
		AsyncPipe,
		CageGridComponent,
		CageGridDirective,
		KeyValuePipe,
		NgFor,
		NgIf,
		NgTemplateOutlet,
		TooltipDirective,
		UnionArrayPipe,
		WikiPipe,
	],
	selector: "app-tech-stack",
	standalone: true,
	styleUrls: [ "./tech-stack.component.scss" ],
	templateUrl: "./tech-stack.component.html",
})
export class TechStackComponent {
	public readonly Position = Position;

	@Input() public readonly color: string;
	@Input() public readonly model: WorkModel["techStack"] = [];

	constructor(private readonly sanitizer: DomSanitizer) { }

	public hasElementOfType(type: Entity_Type): boolean {
		return this.model.some((item) => item.type === type);
	}

	public recolor(url: string | undefined): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(`${url}?color=${this.color.replace("#", "%23")}`);
	}

	public sliceModelByType(type: Entity_Type): WorkModel["techStack"] {
		return this.model.filter((item) => item.type === type);
	}
}
