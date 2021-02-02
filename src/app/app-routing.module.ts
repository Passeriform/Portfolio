import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ExploreComponent } from './explore/explore.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'explore', component: ExploreComponent },

  { path: 'prod', component: ExploreComponent, data: { marker: 'product' } },
  { path: 'proj', component: ExploreComponent, data: { marker: 'project' } },
  { path: 'arts', component: ExploreComponent, data: { marker: 'design' } },
  { path: 'misc', component: ExploreComponent, data: { marker: 'misc' } },

  {
    path: 'about', children: [
      { path: '', component: AboutComponent },
      { path: 'passeriform', redirectTo: '' },
      { path: ':subject', component: AboutComponent },
    ]
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
