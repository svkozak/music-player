import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedTime'
})
export class FormattedTimePipe implements PipeTransform {

  transform(time: any, args?: any): string {
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${minutes}:${formattedSeconds}`;
  }

}
