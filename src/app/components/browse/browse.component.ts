import { selectAlbums, selectIsLoading } from './../../state/selectors/album.selectors';
import { LoadAlbums, LoadAlbum } from './../../state/actions/album.actions';
import { MusicKitService } from './../../services/music-kit.service';
import { ApiServiceService } from "./../../services/api-service.service";
import { Component, OnInit } from '@angular/core';
import { Album } from './../../models/album.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isLoading: boolean;
  genres = [];
  topAlbums: Album[];
  otherAlbums: Album[];

  constructor(
    private musicKitService: MusicKitService,
    private store: Store<any>,
    private router: Router
    ) { }

  ngOnInit() {

    this.store.dispatch(new LoadAlbums());
    this.store.select(selectAlbums).subscribe(albums => this.topAlbums = albums);
    this.store.select(selectIsLoading).subscribe(isLoading => this.isLoading = isLoading);
  }

  formatArtwork(artwork: any, size: string): string {
    let url = "";
    this.musicKitService.formatArtworkURL(artwork, size).subscribe(res => {
      url = res;
    });
    return url;
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['albums', album.id]);
  }

}
