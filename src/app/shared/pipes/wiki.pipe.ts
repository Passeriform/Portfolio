import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

import type { Observable } from "rxjs";

import type { EntityIdentifierType } from "@shared/models/registry.interface";
import type { WikiEntry } from "@core/services/wiki.interface";
import { WikiService } from "@core/services/wiki.service";

@Pipe({
	name: "wiki",
})
export class WikiPipe implements PipeTransform {
	constructor(private readonly wikiService: WikiService) { }

	public transform(entity: EntityIdentifierType): Observable<WikiEntry> {
		return this.wikiService.getWikiDetail$(entity);
	}
}
