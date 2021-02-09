import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutResolver } from './about-resolver.service';
import { AboutRoutingModule } from './about-routing.module';

import { SocialGlyphsComponent } from './social-glyphs/social-glyphs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		// RouterModule,
		SharedModule,
		AboutRoutingModule,
	],
	declarations: [
		AboutComponent,
		SocialGlyphsComponent,
	],
	providers: [AboutResolver],
})
export class AboutModule { }
