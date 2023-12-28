import { HTTP_INTERCEPTORS, HttpHeaders, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import type { Provider} from "@angular/core";
import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import type { LoadChildrenCallback, Route } from "@angular/router";
import { provideRouter, withDebugTracing, withRouterConfig } from "@angular/router";
import { APOLLO_OPTIONS, Apollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import type { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloLink } from "@apollo/client/link/core";

import { environment } from "@env/environment";
import { AppComponent } from "@app/app.component";
import { ErrorService } from "@app/error/services/error.service";
import { FooterService } from "@app/footer/services/footer.service";
import { GithubService } from "@app/landing/update-roll/services/github.service";
import { LoaderService } from "@app/loader/services/loader.service";
import { WorkService } from "@app/work/services/work.service";
import { HttpErrorInterceptor } from "@core/interceptors/http-error.interceptor";
import { CanvasService } from "@core/services/canvas.service";
import { PageRevealService } from "@core/services/page-reveal.service";
import { SplashStateService } from "@core/services/splash-state.service";
import { WikiService } from "@core/services/wiki.service";

if (environment.production) {
	enableProdMode();
}

// eslint-disable-next-line functional/prefer-immutable-types
const constructLazy = (urlPath: string, childrenLoader: LoadChildrenCallback, providers?: Provider[]): Readonly<Route> => (
	{
		children: [
			{
				loadChildren: childrenLoader,
				path: "",
			},
		],
		path: urlPath,
		providers,
	}
);

bootstrapApplication(
	AppComponent,
	{
		providers: [
			/// Router
			provideRouter(
				[
					constructLazy("about", async () => import("@app/about/routes/about.routes"), []),
					constructLazy("", async () => import("@app/landing/routes/landing.routes")),
					constructLazy("", async () => import("@app/work/routes/work.routes")),
				],
				withRouterConfig({
					onSameUrlNavigation: "reload",
					paramsInheritanceStrategy: "always",
				}),
				...environment.production ? [] : [ withDebugTracing() ],
			),
			/// HTTP Interceptor
			{
				multi: true,
				provide: HTTP_INTERCEPTORS,
				useClass: HttpErrorInterceptor,
			},
			provideHttpClient(withInterceptorsFromDi()),

			/// Apollo Graphql
			Apollo,
			{
				deps: [ HttpLink ],
				provide: APOLLO_OPTIONS,
				useFactory: (httpLink: Readonly<HttpLink>): Readonly<ApolloClientOptions<NormalizedCacheObject>> => ({
					cache: new InMemoryCache(),
					link: ApolloLink.from([
						httpLink.create({
							headers: new HttpHeaders({ apiKey: environment.graphqlApiKey }),
							uri: environment.graphqlServerUri,
						}),
					]),
				}),
			},

			/// App Services
			CanvasService,
			ErrorService,
			FooterService,
			GithubService,
			LoaderService,
			PageRevealService,
			SplashStateService,
			WikiService,
			WorkService,
		],
	},
).catch((error: unknown) => {
	// eslint-disable-next-line no-console
	console.error(error);
});
