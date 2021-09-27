import { NgModule } from "@angular/core";
import type { Route, Routes, LoadChildrenCallback } from "@angular/router";
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

const routes: Routes = [
	constructLazy("about", async () => import("./about/about.module").then((childModule) => childModule.AboutModule)),
	constructLazy("", async () => import("./work/work.module").then((childModule) => childModule.WorkModule)),
	constructLazy("", async () => import("./landing/landing.module").then((childModule) => childModule.LandingModule)),
];

@NgModule({
	exports: [ RouterModule ],
	imports: [
		RouterModule.forRoot(routes, {
			paramsInheritanceStrategy: "always",
			relativeLinkResolution: "corrected",
		}),
	],
})
export class AppRoutingModule { }
