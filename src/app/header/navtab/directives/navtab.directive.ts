import type { ElementRef } from "@angular/core";
import { Directive, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appNavLink]",
})
export class NavtabDirective {
	public tabTemplate: TemplateRef<ElementRef>;

	constructor(private readonly templateReference: TemplateRef<ElementRef>) {
		this.tabTemplate = this.templateReference;
	}
}
