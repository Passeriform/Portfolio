import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { EntityIdentifier, registry } from "@shared/models/registry.interface";
import type { EntityRegistry } from "@shared/models/registry.interface";
import type { WikiResponseModel } from "@shared/models/wiki.interface";

@Pipe({
	name: "wiki",
})
export class WikiPipe implements PipeTransform {
	constructor(private readonly http: HttpClient) { }

	// TODO: Move this method out of class

	public getWikiTitle(identifier: string): string {
		return registry.find(
			(entry: EntityRegistry) => entry.identifier === EntityIdentifier[identifier],
		)?.wikiTitle ?? "";
	}

	transform(entity: string): Observable<Record<string, unknown>> {
		const callUrl = "https://en.wikipedia.org/w/api.php?"
			+ "action=query"
			+ "&format=json"
			+ "&origin=*"
			+ "&prop=info|description"
			+ "&formatversion=2"
			+ "&inprop=url"
			+ `&titles=${this.getWikiTitle(entity)}`;

		/*
		 * Alternative Wiki APIs (extraction)
		 *
		 * const callUrl = "https://en.wikipedia.org/w/api.php?"
		 *   + "action=query"
		 *   + "&format=json"
		 *   + "&origin=*"
		 *   + "&prop=extracts"
		 *   + "&formatversion=2"
		 *   + "&exlimit=1"
		 *   + "&exintro=1"
		 *   + "&explaintext=1"
		 *   + "&titles=${getWikiTitle(entity)}";
		 */

		/*
		 * Alternative Wiki APIs (list-search)
		 *
		 * const callUrl = "https://en.wikipedia.org/w/api.php?"
		 *   + "action=query"
		 *   + "&format=json"
		 *   + "&origin=*"
		 *   + "&list=search"
		 *   + "&srlimit=1"
		 *   + "&redirects=1"
		 *   + "&srsearch=${srtitle}_${srcategory}";
		 */

		// TODO: Use generator API to fetch proper description as well.

		// TODO: Consider switching to google search results and picking the first result instead

		// TODO: Fix 404 on search results

		return this.http.get<WikiResponseModel>(callUrl).pipe(
			map((response: WikiResponseModel) => {
				const [ page ] = response.query.pages;

				const { description, fullurl: href, title } = page;

				return {
					description,
					href,
					title,
				};
			}),
		);
	}
}
