import { RouterModule } from "@angular/router";
import type { Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { routeFilters } from "./work.config";
import { WorkComponent } from "./work.component";
import { WorkResolver } from "./work-resolver.service";
// import { PersonalityGuard } from "../core";

const routes: Routes = [
	// Register default explore route
	{
		component: WorkComponent,
		path: "explore",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	// Register filter routes.
	...routeFilters.map(
		(filter: string) => ({
				component: WorkComponent,
				path: `explore/${filter}`,

				// TODO: Add personality selector here.

				// canActivate: [PersonalityGuard],
				resolve: { model: WorkResolver },
			}),
	),
	// Register explore catch-all.
	{
		children: [{
			// TODO: Add another route entry for explore/product/someproduct -> product/someproduct
			path: "**",
			redirectTo: ""
		}],
		path: "explore",
	},
	// Register showcase-only routes.
	...routeFilters.map(
		(filter: string) => [
			`${filter}`,
			`${filter}/:package`,
			`${filter}/:package/:module`,
			`${filter}/:package/:module/:submodule`
		].map(routeSelector => ({
				component: WorkComponent,
				path: routeSelector,

				// TODO: Add personality selector here.

				// canActivate: [PersonalityGuard],
				resolve: { model: WorkResolver },
			}))
	).flat(),
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
})
export class WorkRoutingModule { }
