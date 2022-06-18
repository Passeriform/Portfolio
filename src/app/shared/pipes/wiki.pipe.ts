import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import type { Observable } from "rxjs";
import { Subject } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";

import type { EntityRegistry } from "@shared/models/registry.interface";
import { EntityIdentifier, registry } from "@shared/models/registry.interface";
import type { WikiResponseModel, WikiResponsePage } from "@shared/models/wiki.interface";
import { INIT_WIKI_RESPONSE_PAGE } from "@shared/models/wiki.interface";

@Pipe({
	name: "wiki",
})
export class WikiPipe implements PipeTransform {
	private readonly wikiEntitySubject = new Subject<string>();
	private readonly wikiEntryState$ = this.wikiEntitySubject.asObservable()
		.pipe(
			distinctUntilChanged(),
			switchMap((entity: string) => this.fetchWikiDetails(entity)),
		);

	constructor(private readonly http: HttpClient) { }

	// TODO: Move this method out of class

	// TODO: Use Cirrus search API instead of this hack
	private getWikiTitle(identifier: string): string {
		return registry.find(
			(entry: EntityRegistry) => entry.identifier === EntityIdentifier[identifier],
		)?.wikiTitle ?? EntityIdentifier[identifier] ?? "";
	}

	private fetchWikiDetails(entity: string): Observable<Record<string, unknown>> {
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
			map((response: WikiResponseModel): Record<string, unknown> => {
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
		);
	}

	public transform(entity: string): Observable<Record<string, unknown>> {
		this.wikiEntitySubject.next(entity);

		return this.wikiEntryState$;
	}
}
