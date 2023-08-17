import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipse'
})
export class EllipsePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    let val = '';
    if (value) {
      const len = args && args[0] ? args[0] : 50;
      val = (value.length > 50) ? (value.substring(0, len) + '...') : value;
    }
    return val;
  }

}
