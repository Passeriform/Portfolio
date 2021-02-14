import { Directive, ElementRef, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[appCaged]',
})
export class CageGridDirective {
	public cageTemplate: TemplateRef<ElementRef<HTMLElement>>;

	@Input('appCaged') title: string;

	constructor(private templateRef: TemplateRef<ElementRef<HTMLElement>>) {
		this.cageTemplate = this.templateRef;
	}
}
