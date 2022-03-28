import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'annualsalary'
})
export class AnnualsalaryPipe implements PipeTransform {

  transform(value: number): number {
    return value*12;
  }

}
