import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

// import { PersonalityGuard } from "@core/guards/personality.guard";

import { LandingComponent } from "../landing.component";

const routes: Routes = [
	{

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard]
		component: LandingComponent,
		path: "",
	},
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
})
export class LandingRoutingModule { }
