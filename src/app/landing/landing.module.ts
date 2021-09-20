import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { SweeperComponent } from "./sweeper/sweeper.component";
import { BadgeComponent } from "./badge/badge.component";
import { UpdateRollComponent } from "./update-roll/update-roll.component";
import { GithubService } from "./update-roll/github.service";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";

@NgModule({
	declarations: [
		BadgeComponent,
		LandingComponent,
		SweeperComponent,
		UpdateRollComponent,
	],
	imports: [
		LandingRoutingModule,
		SharedModule,
	],
	providers: [ GithubService ],
})
export class LandingModule { }
