import type { ElementRef } from "@angular/core";
import { Directive, TemplateRef } from "@angular/core";

@Directive({
	selector: "[appNavtab]",
	standalone: true,
})
export class NavtabDirective {
	public template: TemplateRef<ElementRef>;

	constructor(private readonly templateReference: TemplateRef<ElementRef>) {
		this.template = this.templateReference;
	}
}
