import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { map, shareReplay, switchMap, tap } from "rxjs/operators";

import type { EntityRegistry } from "@shared/models/registry.interface";
import { EntityIdentifier, inverseGet, registry } from "@shared/models/registry.interface";

import type { WikiEntry, WikiResponseModel, WikiResponsePage } from "./wiki.interface";
import { INIT_WIKI_RESPONSE_PAGE } from "./wiki.interface";

@Injectable()
export class WikiService {
	private readonly wikiEntriesSubject$ = new BehaviorSubject<Record<string, Observable<WikiEntry> | undefined>>({});
	private readonly wikiEntryState$ = this.wikiEntriesSubject$.asObservable();

	// TODO: Move this method out of class

	// TODO: Use Cirrus search API instead of this hack
	// TODO: Too many fallbacks make this hard to read. Use easier logic
	private getWikiTitle(entityString: string): string {
		return registry.find(
			(entry: EntityRegistry) => entry.identifier === (EntityIdentifier[inverseGet(entityString)] || EntityIdentifier[entityString]),
		)?.wikiTitle ?? EntityIdentifier[inverseGet(entityString)] ?? EntityIdentifier[entityString] ?? "";
	}

	private fetchWikiDetails(entity: string): Observable<WikiEntry> {
		// TODO: Move to environment when finalized.

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

	public getWikiDetail$(entryKey: string): Observable<WikiEntry> {
		return this.wikiEntryState$.pipe(
			map(
				(entries: Record<string, Observable<WikiEntry> | undefined>) => entries[entryKey] ?? this.fetchWikiDetails(entryKey),
			),
			tap((entry$: Observable<WikiEntry>) => {
				this.wikiEntriesSubject$.next({
					// eslint-disable-next-line rxjs/no-subject-value
					...this.wikiEntriesSubject$.value,
					[entryKey]: entry$,
				});
			}),
			switchMap((entry$: Observable<WikiEntry>) => entry$),
		);
	}
}
