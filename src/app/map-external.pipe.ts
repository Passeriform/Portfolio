import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { registry, EntityIdentifier } from './common/global';

import { WikiResponseModel } from './common/wiki.interface';

@Pipe({
  name: 'mapExternal'
})
export class MapExternalPipe implements PipeTransform {
  constructor(private http: HttpClient) { }

  transform(entity: string): Observable<object> {
    const callUrl = `https://en.wikipedia.org/w/api.php?
action=query
&format=json
&origin=*
&prop=info|description
&formatversion=2
&inprop=url
&titles=${this.getWikiTitle(entity)}`;

//     const callUrl = `https://en.wikipedia.org/w/api.php?
// action=query
// &format=json
// &origin=*
// &prop=extracts
// &formatversion=2
// &exlimit=1
// &exintro=1
// &explaintext=1
// &titles=${getWikiTitle(entity)}`;

//     const callUrl = `https://en.wikipedia.org/w/api.php?
// format=json
// &origin=*
// &action=query
// &list=search
// &srlimit=1
// &redirects=1
// &srsearch=${srtitle}_${srcategory}`;

    // TODO: Use generator API to fetch proper description as well.
    // TODO: Consider switching to google search results and picking the first result instead
    // TODO: Fix 404 on search results

    return this.http.get<WikiResponseModel>(callUrl).pipe(
      map((response) => {
        const page = response.query.pages[0];

        const title = page.title ?? '';
        const description = page.description ?? '';
        const href = page.fullurl ?? '#';

        return {
          title,
          description,
          href
        };
      }),
      catchError((error) => {
        console.log('ErrorService triggered error.');
        return Observable.throw(error.message);
      })
    );
  }

  getWikiTitle(identifier: string) {
    for (const entry of registry) {
      if (entry.identifier === EntityIdentifier[identifier]) {
        return entry.wikiTitle;
      }
    }
  }
}
