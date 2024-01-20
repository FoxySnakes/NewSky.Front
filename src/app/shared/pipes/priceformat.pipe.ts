import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceformat'
})
export class PriceformatPipe implements PipeTransform {

  transform(value: number, taxes?: number): string {
    if(!taxes){
      taxes = 1
    }
    return `${((Math.round(value * taxes * 100) / 100) )}€`
  }

}
