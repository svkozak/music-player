import { Track } from './../../models/track.model';
import { ApiServiceService } from './../../services/api-service.service';
import { Album } from './../../models/album.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit {

  selectedAlbum: Album;
  tracks: Track[];

  constructor(private route: ActivatedRoute, private api: ApiServiceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(val => {
       this.getAlbum((val.get('id')));
    })
    
  }

  getAlbum(id: string) {
    this.api.getAlbum(id).subscribe(res => {
      this.selectedAlbum = res;
      if (this.selectedAlbum.relationships) {
        this.tracks = this.selectedAlbum.relationships.tracks.data;
      }
    })
  }


}
