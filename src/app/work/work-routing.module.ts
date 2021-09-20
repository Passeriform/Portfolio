import { RouterModule } from "@angular/router";
import type { Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { routeFilters } from "./work.config";
import { WorkComponent } from "./work.component";
import { WorkResolver } from "./work-resolver.service";
// import { PersonalityGuard } from "../core";

const routes: Routes = [
	...routeFilters.map(
		(tag: string) => ({
			component: WorkComponent,
			path: tag,

			// TODO: Add personality selector here.

			// canActivate: [PersonalityGuard],

			// TODO: Add another resolver for setting url according to filters

			resolve: { model: WorkResolver },
		}),
	),
	{
		component: WorkComponent,
		path: ":package",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	{
		component: WorkComponent,
		path: ":package/:module",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	{
		component: WorkComponent,
		path: ":package/:module/:submodule",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	{
		component: WorkComponent,
		path: "",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
})
export class WorkRoutingModule { }
