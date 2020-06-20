import { Pipe, PipeTransform } from '@angular/core';

import { registry, IconIdentifier } from './common/global';

@Pipe({
  name: 'iconUri'
})
export class IconUriPipe implements PipeTransform {

  transform(iconstr: string): string {
    return this.getIcon(iconstr);
  }


  getIcon(iconstr: string) {
    for (const entry of registry) {
      if (entry.iconstr === IconIdentifier[iconstr]) {
        return entry.iconUrl;
      }
    }
  }

}
