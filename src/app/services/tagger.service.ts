import { Injectable } from '@angular/core';

import { WorkModel } from '../explore/work.interface';

import { nonKeywords } from '../common/global';

@Injectable()
export class TaggerService {
  constructor() { }

  getKeywords(textstr: string): string[] {
    const keyArr = textstr.split(/[\s,:/\\?\-;\(\).']+/);
    return keyArr.filter(key => {
      return key && !nonKeywords.includes(key.toLowerCase());
    });
  }

  appendTags(modelList: WorkModel[]) {
    modelList.map(model => {
      model.tags.push(
        model.type,
        ...(this.getKeywords(model.title ?? '')),
        ...(this.getKeywords(model.subtitle ?? '')),
        ...(this.getKeywords(model.description ?? '')),
        ...(model.license ?? []),
        ...(model.languages ?? []),
        ...(model.frameworks ?? []),
        ...(model.tools ?? [])
      );
    });
    return modelList;
  }
}
