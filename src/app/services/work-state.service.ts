import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { FetchService } from '../services/fetch.service';
import { TaggerService } from '../services/tagger.service';

import { Constants } from '../common/global';

@Injectable()
export class WorkStateService {
  private workFilterSource = new BehaviorSubject<(_: any) => boolean>((_) => true);
  private workCacheSource = new BehaviorSubject<Array<any>>([]);
  private workActiveSource = new BehaviorSubject<Array<any>>([]);
  private workSelectedSource = new BehaviorSubject<Object>(null);

  workFilterState$ = this.workFilterSource.asObservable();
  workCacheState$ = this.workCacheSource.asObservable();
  workActiveState$ = this.workActiveSource.asObservable();
  workSelectedState$ = this.workSelectedSource.asObservable();

  constructor(private fetcher: FetchService, private tagger: TaggerService) {
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
    let callURL = `${Constants.API_URL}/work`;

    this.fetcher.getResponse(callURL).subscribe(model => {
      model = this.tagger.appendTags(model);

      model.map(entry => {
        entry.showLanguagesTooltip = false;
        entry.showFrameworksTooltip = false;
        entry.showToolsTooltip = false;
      });

      this.workCacheSource.next(model);
      this.buildActive();
    });
  }
}
