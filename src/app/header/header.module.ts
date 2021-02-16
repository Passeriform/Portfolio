import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { NavtabComponent } from './navtab/navtab.component';
import { NavtabDirective } from './navtab/navtab.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		RouterModule,
		SharedModule,
	],
	declarations: [
		HeaderComponent,
		NavtabComponent,
		NavtabDirective,
	],
	exports: [
		HeaderComponent,
		NavtabComponent,
		NavtabDirective,
	],
})
export class HeaderModule { }
