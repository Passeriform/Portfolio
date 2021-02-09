import { Directive, TemplateRef, ElementRef, HTMLElement } from '@angular/core';

@Directive({
	selector: '[appNavLink]',
})
export class NavtabDirective {
	public tabTemplate: TemplateRef<ElementRef<HTMLElement>>;

	constructor(private templateRef: TemplateRef<ElementRef<HTMLElement>>) {
		this.tabTemplate = this.templateRef;
	}
}
