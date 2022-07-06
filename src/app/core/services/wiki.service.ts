import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, map, shareReplay, switchMap } from "rxjs/operators";

import type { EntityRegistry } from "@shared/models/registry.interface";
import { EntityIdentifier, registry } from "@shared/models/registry.interface";

import type { WikiResponseModel, WikiResponsePage } from "./wiki.interface";
import { INIT_WIKI_RESPONSE_PAGE, WikiEntry } from "./wiki.interface";

@Injectable()
export class WikiService {
	private readonly wikiEntriesSubject = new BehaviorSubject<Record<string, Observable<WikiEntry>>>({});
	private readonly wikiEntryState$ = this.wikiEntriesSubject.asObservable();

	// TODO: Move this method out of class

	// TODO: Use Cirrus search API instead of this hack
	private getWikiTitle(identifier: string): string {
		return registry.find(
			(entry: EntityRegistry) => entry.identifier === EntityIdentifier[identifier],
		)?.wikiTitle ?? EntityIdentifier[identifier] ?? "";
	}

	private fetchWikiDetails(entity: string): Observable<WikiEntry> {
		const callUrl: string = "https://en.wikipedia.org/w/api.php?"
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

		// TODO: Use generator API to fetch proper description as well.

		// TODO: Consider switching to google search results and picking the first result instead

		return this.http.get<WikiResponseModel>(callUrl).pipe(
			map((response: WikiResponseModel): WikiEntry => {
				const [ page ]: readonly (WikiResponsePage | undefined)[] = response.query?.pages ?? [];

				const {
					description,
					fullurl: href,
					title,
				}: WikiResponsePage = page ?? INIT_WIKI_RESPONSE_PAGE;

				return {
					description,
					href,
					title,
				};
			}),
			shareReplay(1)
		);
	}

	constructor(private readonly http: HttpClient) { }

	public getWikiDetails(entryKey: string): Observable<WikiEntry> {
		let wikiEntry: Observable<WikiEntry> = this.wikiEntriesSubject.value[entryKey];

		if (wikiEntry) {
			return wikiEntry;
		}

		wikiEntry = this.fetchWikiDetails(entryKey)

		this.wikiEntriesSubject.next({ ...this.wikiEntriesSubject.value, [entryKey]: wikiEntry })
		return wikiEntry;
	}
}
