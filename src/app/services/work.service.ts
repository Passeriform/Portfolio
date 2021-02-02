import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WorkModel } from '../explore/work.interface';

import { TaggerService } from '../services/tagger.service';
import { LoaderService } from '../services/loader.service';

import { Constants } from '../common/global';

@Injectable()
export class WorkService {
  private workFilterSource = new BehaviorSubject<(_: WorkModel) => boolean>((_) => true);
  private workCacheSource = new BehaviorSubject<WorkModel[]>([]);
  private workActiveSource = new BehaviorSubject<WorkModel[]>([]);
  private workSelectedSource = new BehaviorSubject<WorkModel>(null);

  workFilterState$: Observable<(_: WorkModel) => boolean> = this.workFilterSource.asObservable();
  workCacheState$: Observable<WorkModel[]> = this.workCacheSource.asObservable();
  workActiveState$: Observable<WorkModel[]> = this.workActiveSource.asObservable();
  workSelectedState$: Observable<WorkModel> = this.workSelectedSource.asObservable();

  constructor(private http: HttpClient, private tagger: TaggerService, private loaderService: LoaderService) {
    this.refreshCache();
  }

  setActive(model: WorkModel[]): void {
    this.workActiveSource.next(model);
  }

  setSelected(model: WorkModel): void {
    this.workSelectedSource.next(model);
  }

  setFilter(comparator: (_: WorkModel) => boolean): void {
    this.workFilterSource.next(comparator);
  }

  buildActive(): void {
    this.workActiveSource.next(
      this.workFilterSource.value ?
        this.workCacheSource.value.filter(this.workFilterSource.value) :
        this.workCacheSource.value
    );
  }

  refreshCache() {
    this.loaderService.beginLoading('[http] work');

    const callURL = `${Constants.API_URL}/work`;

    this.http.get<WorkModel[]>(callURL)
      .pipe(
        catchError((error) => {
          console.log('ErrorService triggered error.');
          return Observable.throw(error.message);
        })
      )
      .subscribe((model) => {
        this.loaderService.endLoading('[http] work');

        this.loaderService.beginLoading('[prepare] work');
        model = this.tagger.appendTags(model);

        this.workCacheSource.next(model);

        this.buildActive();

        this.loaderService.endLoading('[prepare] work');
      });
  }
}
