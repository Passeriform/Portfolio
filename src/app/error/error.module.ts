import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		// RouterModule,
		SharedModule,
	],
	declarations: [
		ErrorComponent,
	],
	providers: [
		ErrorService,
	],
	exports: [
		ErrorComponent,
	],
})
export class ErrorModule { }
