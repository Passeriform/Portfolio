import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { DescribeComponent } from './describe/describe.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'explore', component: ShowcaseComponent },

  { path: 'prod', component: ShowcaseComponent, data: {marker: 'product'}},
  { path: 'proj', component: ShowcaseComponent, data: {marker: 'project'}},
  { path: 'arts', component: ShowcaseComponent, data: {marker: 'design'}},
  { path: 'misc', component: ShowcaseComponent, data: {marker: 'misc'}},

  { path: 'about', children: [
    { path: '', component: AboutComponent },
    { path: 'passeriform', redirectTo: '' },
    { path: ':subject', component: AboutComponent },
  ]},

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
