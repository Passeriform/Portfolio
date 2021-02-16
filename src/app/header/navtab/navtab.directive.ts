import { Directive, TemplateRef, ElementRef } from '@angular/core';

@Directive({
	selector: '[appNavLink]',
})
export class NavtabDirective {
	public tabTemplate: TemplateRef<ElementRef<any>>;

	constructor(private templateRef: TemplateRef<ElementRef<any>>) {
		this.tabTemplate = this.templateRef;
	}
}
