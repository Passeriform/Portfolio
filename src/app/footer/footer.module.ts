import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';
import { ChirpyComponent } from './chirpy/chirpy.component';
import { FooterService } from './footer.service';
import { SharedModule } from '../shared/shared.module';
import { AboutModule } from '../about/about.module';

@NgModule({
	imports: [
		RouterModule,
		SharedModule,
		AboutModule,
	],
	declarations: [
		FooterComponent,
		ChirpyComponent,
	],
	providers: [
		FooterService,
	],
	exports: [
		FooterComponent,
	],
})
export class FooterModule { }
