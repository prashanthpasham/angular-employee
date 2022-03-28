import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    if(value!=null && value!=undefined)
       return  value.split("").reverse().join("");

       return value;
  }

}
