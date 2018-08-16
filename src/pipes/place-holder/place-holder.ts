import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})

export class PlaceHolderPipe implements PipeTransform {
  transform(value: string, defaultValue:string = "Sin texto") {

    return (value) ? value :defaultValue;
    
  }
}
