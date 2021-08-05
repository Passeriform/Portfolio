import { ModuleWithProviders, NgModule } from '@angular/core';

import { NavigatorComponent } from './navigator.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		NavigatorComponent,
		BreadcrumbComponent,
	],
	providers: [],
	exports: [
		NavigatorComponent,
		BreadcrumbComponent,
	],
})
export class NavigatorModule { }
