import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchService } from './services/fetch.service'
import { registry, EntityIdentifier } from './common/global';

@Pipe({
  name: 'mapExternal'
})
export class MapExternalPipe implements PipeTransform {
  constructor(private fetcher: FetchService) { }

  transform(entity: string): Observable<object> {
    let callUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info|description&formatversion=2&inprop=&titles=${this.getWikiTitle(entity)}`
    // let callUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&formatversion=2&exlimit=1&exintro=1&explaintext=1&titles=${getWikiTitle(entity)}`;
    // let callUrl = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=search&srlimit=1&redirects=1&srsearch=${srtitle}_${srcategory}`;

    return this.fetcher.getResponse(callUrl).pipe(
      map(response => {
        let page = (response.query.pages || [null])[0]
        const title = page.title || '';
        const description = page.description || '';
        return {
          title: title,
          description: description,
          href: this.getHref(entity)
        }
      })
    )
  }

  getWikiTitle(identifier: string) {
    for (const entry of registry) {
      if (entry.identifier === EntityIdentifier[identifier]) {
        return entry.wikiTitle;
      }
    }
  }

  getHref(identifier: string) {
    for (const entry of registry) {
      if (entry.identifier === EntityIdentifier[identifier]) {
        return entry.href || '#';
      }
    }
  }
}
