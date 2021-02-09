import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutResolver } from './about-resolver.service';
// Import { PersonalityGuard } from '../core';
// import { SharedModule } from '../shared';

const routes: Routes = [
	{
		path: '',
		component: AboutComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: {
			model: AboutResolver,
		},
	},
	{ path: 'passeriform', redirectTo: '' },
	{
		path: ':slug',
		component: AboutComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: {
			model: AboutResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AboutRoutingModule { }
