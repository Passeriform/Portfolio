import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'retain'
})
export class RetainPipe implements PipeTransform {

  transform(inObject: object, ...keepProps: string[]): any {
    let newObject = {}

    Object.entries(inObject).forEach(([key, value]) => {
      if (keepProps.includes(key)) {
        newObject[key] = inObject[key]
      }
    });

    return newObject;
  }
}
