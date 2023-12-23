import type { ElementRef } from "@angular/core";
import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appCaged]",
	standalone: true,
})
export class CageGridDirective {
	@Input("appCaged") public readonly title: string;
	@Input("appCagedAnimateContent") public readonly animateContent: boolean;

	public readonly cageTemplate: TemplateRef<ElementRef<HTMLElement>>;

	constructor(private readonly templateReference: TemplateRef<ElementRef<HTMLElement>>) {
		this.cageTemplate = this.templateReference;
	}
}
