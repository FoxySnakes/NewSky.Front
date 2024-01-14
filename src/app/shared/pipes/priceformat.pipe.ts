import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceformat'
})
export class PriceformatPipe implements PipeTransform {

  transform(value: number): string {
    return `${Math.round(value).toFixed(2)}€`
  }

}
