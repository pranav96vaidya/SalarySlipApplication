import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrCurrency'
})
export class INRCurrencyPipe implements PipeTransform {
  transform(value, option): string {
    if (value && !isNaN(value) && option) {
      value = Math.round(value);
      const result = value.toString().split('.');
      let lastThree = result[0].substring(result[0].length - 3);
      const otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '' && otherNumbers != '-') {
        lastThree = ',' + lastThree;
      }
      let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
      if (result.length > 1) {
        output += '.' + result[1];
      }
      return output;
      } else {
      return value;
    }
  }
}
