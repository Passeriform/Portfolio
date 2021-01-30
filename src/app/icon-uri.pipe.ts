import { Pipe, PipeTransform } from '@angular/core';

import { registry, EntityIdentifier } from './common/global';

@Pipe({
  name: 'iconUri'
})
export class IconUriPipe implements PipeTransform {

  transform(iconstr: string): string {
    return this.getIcon(iconstr);
  }

  getIcon(identifier: string) {
    for (const entry of registry) {
      if (entry.identifier === EntityIdentifier[identifier]) {
        return entry.iconUrl;
      }
    }
  }
}
