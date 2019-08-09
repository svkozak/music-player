import { selectLibraryPlaylists } from './../state/library.selectors';
import { LoadLibraryPlaylists } from './../state/library.actions';
import { selectIsLibraryLoading, selectLibraryAlbums } from '../state/library.selectors';
import { Playlist } from '../../models/playlist.model';
import { Album } from '../../models/album.model';
import { Router } from '@angular/router';
import { MusicKitService } from '../../services/music-kit.service';
import { Store } from '@ngrx/store';
import { ApiServiceService } from '../../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import * as libraryActions from '../state/library.actions';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  isLoading: boolean;
  albums: Album[];
  playlists: Playlist[];

  constructor(    
    private musicKitService: MusicKitService,
    private store: Store<any>,
    private router: Router
    ) {
      this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
      this.store.select(selectLibraryAlbums).subscribe(albums => this.albums = albums);
      this.store.select(selectLibraryPlaylists).subscribe(playlists => this.playlists = playlists);
    }

  ngOnInit() { 
    this.store.dispatch(new libraryActions.LoadLibraryAlbums());
    this.store.dispatch(new libraryActions.LoadLibraryPlaylists());
  }

  ngOnDestroy() {
  }

  formatArtwork(artwork: any, size: string): string {
    let url = "";
    this.musicKitService.formatArtworkURL(artwork, size).subscribe(res => {
      url = res;
    });
    return url;
  }

  onAlbumSelected(album: Album) {
    console.log(`LIBRARY ALBUM ID IS ${album.id}`);
    this.router.navigate(['library/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    console.log(`LIBRARY PLAYLIST ID IS ${playlist.id}`);
    this.router.navigate(['library/playlists', playlist.id]);
  }

}
