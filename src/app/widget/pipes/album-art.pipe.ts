import { MusicKitService } from './../../services/music-kit.service';
import { ApiServiceService } from './../../services/api-service.service';
import { Pipe, PipeTransform } from '@angular/core';

declare var MusicKit: any;

@Pipe({
  name: 'albumArt'
})
export class AlbumArtPipe implements PipeTransform {

  constructor(private musicKitService: MusicKitService) {}

  transform(artworkUrl: any, size?: string): string {
    let url;
    this.musicKitService.formatArtworkURL(artworkUrl, size).subscribe(val => {
      url = val;
    });
    return url;
  }

}
