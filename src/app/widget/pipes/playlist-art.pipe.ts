import { ApiServiceService } from './../../services/api-service.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playlistArt'
})
export class PlaylistArtPipe implements PipeTransform {

  constructor(private api: ApiServiceService) {}

  transform(id: any, args?: any): string {
    let url = '';
    this.api.getPlaylistArtworkUrl(id).subscribe(val => url = val);
    return url;
  }

}
