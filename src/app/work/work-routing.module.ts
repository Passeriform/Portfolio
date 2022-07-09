import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
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
	...routeFilters.flatMap(
		(filter: string) => [
			{
				component: WorkComponent,
				path: `explore/${filter}`,

				// TODO: Add personality selector here.

				// canActivate: [PersonalityGuard],
				resolve: { model: WorkResolver },
			},
			{
				path: `explore/${filter}/:package`,
				redirectTo: `${filter}/:package`,
			},
		],
	),
	// Register explore catch-all.
	{
		children: [
			{
				path: "**",
				redirectTo: "",
			},
		],
		path: "explore",
	},
	// Register showcase-only routes.
	...routeFilters.flatMap(
		(filter: string) => [
			`${filter}`,
			`${filter}/:package`,
			`${filter}/:package/:module`,
			`${filter}/:package/:module/:submodule`,
		].map((routeSelector: string) => ({
			component: WorkComponent,
			path: routeSelector,

			// TODO: Add personality selector here.

			// canActivate: [PersonalityGuard],
			resolve: { model: WorkResolver },
		})),
	),
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
})
export class WorkRoutingModule { }
