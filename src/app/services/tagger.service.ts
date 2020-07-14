import { Injectable } from '@angular/core';

import { nonKeywords } from '../common/global';

@Injectable()
export class TaggerService {
  constructor() { }

  getKeywords(textstr: string): Array<string> {
    const keyArr = textstr.split(/[\s,:/\\?\-;\(\).']+/);
    return keyArr.filter(key => {
      return !nonKeywords.includes(key.toLowerCase()) && key !== '';
    });
  }

  appendTags(modelList: Array<any>) {
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
}
