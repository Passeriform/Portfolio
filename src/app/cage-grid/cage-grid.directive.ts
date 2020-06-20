import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appCaged]'
})
export class CageGridDirective {
  public cageTemplate: TemplateRef<any>;

  @Input('appCaged') title: string;

  constructor(private templateRef: TemplateRef<any>) {
    this.cageTemplate = this.templateRef;
  }


}
