import { NgModule } from "@angular/core";
import type { Route, Routes, LoadChildrenCallback } from "@angular/router";
import { RouterModule } from "@angular/router";

const constructLazy = (urlPath: string, childrenLoader: LoadChildrenCallback): Route => (
	{
		path: urlPath,
		children: [
			{
				loadChildren: childrenLoader,
				path: "",
			},
		],
	}
)

const routes: Routes = [
	constructLazy("explore", async () => import("./work/work.module").then((childModule) => childModule.WorkModule)),
	constructLazy("about", async () => import("./about/about.module").then((childModule) => childModule.AboutModule)),
	constructLazy("", async () => import("./landing/landing.module").then((childModule) => childModule.LandingModule))
];

@NgModule({
	exports: [ RouterModule ],
	imports: [
		RouterModule.forRoot(routes, {
			 relativeLinkResolution: "corrected",
			paramsInheritanceStrategy: "always"
		}),
	],
})
export class AppRoutingModule { }
