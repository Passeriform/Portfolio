import type { Routes } from "@angular/router";

// import { PersonalityGuard } from "@core/guards/personality.guard";

import { routeFilters } from "../work.config";
import { WorkComponent } from "../work.component";
import { ExploreResolver } from "./explore-resolver.service";
import { FilterResolver } from "./filter-resolver.service";
import { ShowcaseResolver } from "./showcase-resolver.service";

// eslint-disable-next-line functional/prefer-immutable-types
const ROUTES: Routes = [
	// Register default explore route
	{
		component: WorkComponent,
		path: "explore",

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard],
		resolve: { model: ExploreResolver },
	},
	// Register filter routes.
	...routeFilters.flatMap(
		(filter: string) => [
			{
				component: WorkComponent,
				path: `explore/${filter}`,

				// TODO: Add personality selector here.

				// canActivate: [PersonalityGuard],
				resolve: { model: FilterResolver },
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
			filter,
			`${filter}/:package`,
			`${filter}/:package/:module`,
			`${filter}/:package/:module/:submodule`,
		].map((routeSelector: string) => ({
			component: WorkComponent,
			path: routeSelector,

			// TODO: Add personality selector here.

			// canActivate: [PersonalityGuard],
			resolve: { model: ShowcaseResolver },
		})),
	),
];

// eslint-disable-next-line import/no-default-export
export default ROUTES;
