import type { Routes } from "@angular/router";

// import { PersonalityGuard } from "@core/guards/personality.guard";

import { LandingComponent } from "../landing.component";

// eslint-disable-next-line functional/prefer-immutable-types
const ROUTES: Routes = [
	{

		// TODO: Add personality selector here.

		// canActivate: [PersonalityGuard]
		component: LandingComponent,
		path: "",
	},
];

// eslint-disable-next-line import/no-default-export
export default ROUTES;
