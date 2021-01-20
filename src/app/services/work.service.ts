import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, catchError } from 'rxjs/operators';

import { TaggerService } from '../services/tagger.service';
import { LoaderService } from '../services/loader.service';

import { Constants } from '../common/global';

@Injectable()
export class WorkService {
  private workFilterSource = new BehaviorSubject<(_: any) => boolean>((_) => true);
  private workCacheSource = new BehaviorSubject<Array<any>>([]);
  private workActiveSource = new BehaviorSubject<Array<any>>([]);
  private workSelectedSource = new BehaviorSubject<Object>(null);

  workFilterState$ = this.workFilterSource.asObservable();
  workCacheState$ = this.workCacheSource.asObservable();
  workActiveState$ = this.workActiveSource.asObservable();
  workSelectedState$ = this.workSelectedSource.asObservable();

  constructor(private http: HttpClient, private tagger: TaggerService, private loaderService: LoaderService) {
    this.refreshCache();
  }

  setActive(model: Array<any>) {
    this.workActiveSource.next(model);
  }

  setSelected(model: object) {
    this.workSelectedSource.next(model);
  }

  setFilter(comparator: (_: any) => boolean) {
    this.workFilterSource.next(comparator);
  }

  buildActive() {
    if (this.workFilterSource.value == null) {
      this.workActiveSource.next(this.workCacheSource.value);
    }
    else {
      this.workActiveSource.next(
        this.workCacheSource.value.filter(this.workFilterSource.value)
      );
    }
  }

  refreshCache() {
    this.loaderService.beginLoading("[http] work");

    let callURL = `${Constants.API_URL}/work`;

    this.http.get<Array<any>>(callURL)
    .pipe(
      catchError((error) => {
        console.log("ErrorService triggered error.");
        return Observable.throw(error.message);
      })
    )
    .subscribe((model) => {
      this.loaderService.endLoading("[http] work");

      this.loaderService.beginLoading("[prepare] work");
      model = this.tagger.appendTags(model);

      model.map(entry => {
        entry.showLanguagesTooltip = false;
        entry.showFrameworksTooltip = false;
        entry.showToolsTooltip = false;
      });

      this.workCacheSource.next(model);

      this.buildActive();

      this.loaderService.endLoading("[prepare] work");
    });
  }
}
