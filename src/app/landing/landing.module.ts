import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { HeaderModule } from "@app/header/header.module";

import { SweeperComponent } from "./sweeper/sweeper.component";
import { BadgeComponent } from "./badge/badge.component";
import { UpdateRollComponent } from "./update-roll/update-roll.component";
import { GithubService } from "./update-roll/services/github.service";
import { LandingRoutingModule } from "./routes/landing-routing.module";
import { LandingComponent } from "./landing.component";

@NgModule({
	imports: [
		BadgeComponent,
		HeaderModule,
		LandingComponent,
		LandingRoutingModule,
		SharedModule,
		SweeperComponent,
		UpdateRollComponent,
	],
	providers: [ GithubService ],
})
export class LandingModule { }
