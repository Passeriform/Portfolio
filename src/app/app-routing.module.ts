import { NgModule } from "@angular/core";
import type { LoadChildrenCallback, Routes } from "@angular/router";
import { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

const constructLazy = (urlPath: string, childrenLoader: LoadChildrenCallback): Route => (
	{
		children: [
			{
				loadChildren: childrenLoader,
				path: "",
			},
		],
		path: urlPath,
	}
);

// TODO: Pull filters from http service before bootstraping routes [dependency on GraphQL migration].

// TODO: Revert landing and work reordering when static values are available.

// NOTE: Reordering landing and work modules as a hack to make same-named paths work.
const routes: Routes = [
	constructLazy("about", async () => import("./about/about.module").then((childModule) => childModule.AboutModule)),
	constructLazy("", async () => import("./landing/landing.module").then((childModule) => childModule.LandingModule)),
	constructLazy("", async () => import("./work/work.module").then((childModule) => childModule.WorkModule)),
];

@NgModule({
	exports: [ RouterModule ],
	imports: [
		RouterModule.forRoot(routes, {
			paramsInheritanceStrategy: "always",
			relativeLinkResolution: "corrected",
			// enableTracing: true,
		}),
	],
})
export class AppRoutingModule { }
