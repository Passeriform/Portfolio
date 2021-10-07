import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { Routes } from "@angular/router";

import { AboutComponent } from "./about.component";
import { AboutResolver } from "./about-resolver.service";
// import { PersonalityGuard } from "../core";

const routes: Routes = [
	{
		component: AboutComponent,
		path: "",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: {
			model: AboutResolver,
		},
	},
	{
		path: "passeriform",
		redirectTo: "",
	},
	{
		component: AboutComponent,
		path: ":slug",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: {
			model: AboutResolver,
		},
	},
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
})
export class AboutRoutingModule { }
