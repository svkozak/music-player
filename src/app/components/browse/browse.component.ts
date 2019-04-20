import { MusicKitService } from './../../services/music-kit.service';
import { ApiServiceService } from "./../../services/api-service.service";
import { Component, OnInit } from '@angular/core';
import { Album } from './../../models/album.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  genres = [];
  topAlbums: Album[];
  otherAlbums: Album[];

  constructor(private api: ApiServiceService, private musicKitService: MusicKitService) { }

  ngOnInit() {

    this.api.getCharts().subscribe(res => {
      console.log(res);
      this.topAlbums = res.albums[0].data;
    })

    this.api.getOtherCharts().subscribe(res => {
      this.otherAlbums = res.results.albums[0].data;
    })

  }

  formatArtwork(artwork: any, size: string): string {
    let url = "";
    this.musicKitService.formatArtworkURL(artwork, size).subscribe(res => {
      url = res;
    });
    return url;
  }

}
