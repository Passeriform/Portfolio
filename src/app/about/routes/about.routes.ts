import type { Routes } from "@angular/router";

// import { PersonalityGuard } from "@core/guards/personality.guard";

import { AboutComponent } from "../about.component";
import { AboutResolver } from "./about-resolver.service";

// eslint-disable-next-line functional/prefer-immutable-types
const ROUTES: Routes = [
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

// eslint-disable-next-line import/no-default-export
export default ROUTES;
