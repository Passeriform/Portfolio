import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkComponent } from './work.component';
import { WorkResolver } from './work-resolver.service';
import { routeFilters } from './work.config';
// Import { PersonalityGuard } from '../core';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: WorkComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	...routeFilters.map((tag: string) =>
		({
			path: tag,
			component: WorkComponent,
			// TODO: Add personality selector here.
			// canActivate: [PersonalityGuard],

			// TODO: Add another resolver for setting url according to filters
			resolve: { model: WorkResolver },
		})),
	{
		path: ':package',
		component: WorkComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	{
		path: ':package/:module',
		component: WorkComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
	{
		path: ':package/:module/:submodule',
		component: WorkComponent,
		// TODO: Add personality selector here.
		// canActivate: [PersonalityGuard],
		resolve: { model: WorkResolver },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WorkRoutingModule { }
