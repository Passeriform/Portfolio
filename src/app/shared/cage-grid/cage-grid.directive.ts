import { Directive, ElementRef, Input, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appCaged]",
})
export class CageGridDirective {
	@Input("appCaged") public readonly title: string;

	public readonly cageTemplate: TemplateRef<ElementRef<HTMLElement>>;

	constructor(private readonly templateReference: TemplateRef<ElementRef<HTMLElement>>) {
		this.cageTemplate = this.templateReference;
	}
}
