import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNavLink]'
})
export class NavtabDirective {

  public tabTemplate: TemplateRef<any>;

  constructor(private templateRef: TemplateRef<any>) {
    this.tabTemplate = this.templateRef;
  }

}
