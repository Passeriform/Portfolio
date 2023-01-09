import { NgModule } from "@angular/core";
import type { LoadChildrenCallback, Route, Routes } from "@angular/router";
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

// TODO: Pull filters from http service before bootstrapping routes [dependency on GraphQL migration].

// TODO: Revert landing and work reordering when static values are available.

// TODO: Convert naming about, work and landing to <route>Page. Move it to pages folder.

// NOTE: Reordering landing and work modules as a hack to make same-named paths work.
const routes: Routes = [
	/* eslint-disable @typescript-eslint/promise-function-async */
	constructLazy("about", () => import("./about/about.module").then((childModule) => childModule.AboutModule)),
	constructLazy("", () => import("./landing/landing.module").then((childModule) => childModule.LandingModule)),
	constructLazy("", () => import("./work/work.module").then((childModule) => childModule.WorkModule)),
	/* eslint-enable @typescript-eslint/promise-function-async */
];

@NgModule({
	exports: [ RouterModule ],
	imports: [
		RouterModule.forRoot(routes, {
			paramsInheritanceStrategy: "always",
			// enableTracing: true,
		}),
	],
})
export class AppRoutingModule { }
