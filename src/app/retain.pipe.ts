import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'retain'
})
export class RetainPipe implements PipeTransform {
  transform(inObject: object, ...keepProps: string[]): object {
    const newObject = {};

    Object.entries(inObject).forEach(([key, _]) => {
      if (keepProps.includes(key)) {
        newObject[key] = inObject[key];
      }
    });

    return newObject;
  }
}
