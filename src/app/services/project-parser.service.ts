import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { nonKeywords } from '../common/global';

import { FetchService } from './fetch.service';

@Injectable()
export class ProjectParserService {
  private model$ = new BehaviorSubject<any>([]);

  modelObs = this.model$.asObservable();

  constructor(private fetcher: FetchService) {
    this.fetcher.getResponse('/config/projects.json').subscribe(fetchList => {
      this.updateModel(this.prepareTags(fetchList));
    });
  }

  getKeywords(textstr: string): Array<string> {
    const keyArr = textstr.split(/[\s,:/\\?\-;\(\).']+/);
    return keyArr.filter(key => {
      return !nonKeywords.includes(key.toLowerCase()) && key !== '';
    });
  }

  prepareTags(modelList: Array<any>) {
    modelList.map(model => {
      model.tags.push(
        model.type,
        ...(this.getKeywords(model.title) || []),
        ...(this.getKeywords(model.description) || []),
        ...(model.license || []),
        ...(model.languages || []),
        ...(model.frameworks || []),
        ...(model.tools || [])
      );
    });
    return modelList;
  }

  updateModel(model) {
    this.model$.next(model);
  }
}
