import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "@shared/shared.module";
import { NavtabComponent } from "./navtab/navtab.component";
import { NavtabDirective } from "./navtab/navtab.directive";
import { HeaderOffsetDirective } from "./header-offset.directive";
import { HeaderComponent } from "./header.component";

@NgModule({
	declarations: [
		HeaderComponent,
		HeaderOffsetDirective,
		NavtabComponent,
		NavtabDirective,
	],
	exports: [
		HeaderComponent,
		HeaderOffsetDirective,
		NavtabComponent,
		NavtabDirective,
	],
	imports: [
		RouterModule,
		SharedModule,
	],
})
export class HeaderModule { }
