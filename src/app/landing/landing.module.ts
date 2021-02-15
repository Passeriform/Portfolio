import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
// Import { LandingResolver } from './landing-resolver.service';
import { LandingRoutingModule } from './landing-routing.module';
import { SweeperComponent } from './sweeper/sweeper.component';
import { BadgeComponent } from './badge/badge.component';
import { UpdateRollComponent } from './update-roll/update-roll.component';
import { GithubService } from './update-roll/github.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		// RouterModule,
		SharedModule,
		LandingRoutingModule,
	],
	declarations: [
		LandingComponent,
		SweeperComponent,
		BadgeComponent,
		UpdateRollComponent,
	],
	providers: [
		// LandingResolver,
		GithubService,
	],
})
export class LandingModule { }
