import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { Routes } from "@angular/router";

import { LandingComponent } from "./landing.component";
// import { PersonalityGuard } from "../core";

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
