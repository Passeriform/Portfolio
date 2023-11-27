import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { InMemoryCache } from "@apollo/client/cache";
import type { ApolloClientOptions, NormalizedCacheObject } from "@apollo/client/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

import { environment } from "@env/environment";

export const createApollo = (httpLink: Readonly<HttpLink>): Readonly<ApolloClientOptions<NormalizedCacheObject>> => ({
	cache: new InMemoryCache(),
	link: httpLink.create({
		headers: new HttpHeaders({ apiKey: environment.graphqlApiKey }),
		uri: environment.graphqlServerUri,
	}),
});

@NgModule({
	exports: [ ApolloModule ],
	imports: [ HttpClientModule ],
	providers: [
		{
			deps: [ HttpLink ],
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
		},
	],
})
export class GraphQLModule { }
