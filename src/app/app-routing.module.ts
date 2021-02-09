import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingModule } from './landing/landing.module';
import { WorkModule } from './work/work.module';
import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
	},
	{
		path: 'explore',
		loadChildren: () => import('./work/work.module').then((m) => m.WorkModule),
	},
	{
		path: 'about',
		loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
	},

	{ path: '**', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
