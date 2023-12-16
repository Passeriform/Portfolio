import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

import type { EntityIdentifier } from "@shared/models/registry.interface";
import { hasWikiEntry, registry } from "@shared/models/registry.interface";

import type { WikiEntry, WikiResponseModel, WikiResponsePage } from "./wiki.interface";
import { INIT_WIKI_RESPONSE_PAGE } from "./wiki.interface";

/*
 * Alternative Wiki APIs (extraction)
 *
 * const callUrl: string = "https://en.wikipedia.org/w/api.php?"
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
 * const callUrl: string = "https://en.wikipedia.org/w/api.php?"
 *   + "action=query"
 *   + "&format=json"
 *   + "&origin=*"
 *   + "&list=search"
 *   + "&srlimit=1"
 *   + "&redirects=1"
 *   + "&srsearch=${srtitle}_${srcategory}";
 */

@Injectable()
export class WikiService {
	private readonly wikiEntries: Record<string, Observable<WikiEntry>> = { };

	// TODO: Move this method out of class

	// TODO: Use Cirrus search API instead of this hack

	constructor(private readonly http: HttpClient) { }

	private fetchWikiDetails$(entity: EntityIdentifier): Observable<WikiEntry> {
		// TODO: Move to environment when finalized.
		if (!hasWikiEntry(entity)) {
			return throwError(() => new Error(`No registry entry found for ${entity}`));
		}

		const callUrl: string = "https://en.wikipedia.org/w/api.php?"
			+ "action=query"
			+ "&format=json"
			+ "&origin=*"
			+ "&prop=info|description"
			+ "&formatversion=2"
			+ "&inprop=url"
			+ `&titles=${registry[entity].wikiTitle}`;


		// TODO: Use generator API to fetch proper description as well.

		// TODO: Consider switching to google search results and picking the first result instead

		return this.http.get<WikiResponseModel>(callUrl).pipe(
			map((response): WikiEntry => {
				const [ page ]: readonly (WikiResponsePage | undefined)[] = response.query?.pages ?? [];

				const {
					description,
					fullurl: href,
					title,
				}: WikiResponsePage = page ?? INIT_WIKI_RESPONSE_PAGE;

				return { description, href, title };
			}),
			shareReplay({ bufferSize: 1, refCount: true }),
		);
	}

	public getWikiDetail$(entryKey: EntityIdentifier): Observable<WikiEntry> {
		const wikiEntry$ = this.wikiEntries[entryKey] ?? this.fetchWikiDetails$(entryKey);
		this.wikiEntries[entryKey] = wikiEntry$;

		return wikiEntry$;
	}
}
