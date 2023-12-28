import type { ElementRef } from "@angular/core";
import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appCaged]",
	standalone: true,
})
export class CageGridDirective {
	public readonly template: TemplateRef<ElementRef<HTMLElement>>;

	@Input("appCagedAnimateContent") public readonly animateContent: boolean;
	@Input("appCaged") public readonly title: string;

	constructor(private readonly templateReference: TemplateRef<ElementRef<HTMLElement>>) {
		this.template = this.templateReference;
	}
}
