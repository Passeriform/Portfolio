import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "@shared/shared.module";

import { NavtabComponent } from "./navtab/navtab.component";
import { NavtabDirective } from "./navtab/directives/navtab.directive";
import { HeaderComponent } from "./header.component";

@NgModule({
	exports: [
		HeaderComponent,
		NavtabComponent,
		NavtabDirective,
	],
	imports: [
		HeaderComponent,
		NavtabComponent,
		NavtabDirective,
		RouterModule,
		SharedModule,
	],
})
export class HeaderModule { }
