import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
// Import { PersonalityGuard } from '../core';

const routes: Routes = [
	{
		path: '',
		component: LandingComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LandingRoutingModule { }
