import { Router } from '@angular/router';
import { Track } from 'src/app/models/track.model';
import { Artist } from './../../models/artist.model';
import { Album } from './../../models/album.model';
import { selectIsSearchLoading, selectSearchAlbums, selectSearchResults } from './../state/search.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as searchActions from '../state/search.actions';
import { Playlist } from 'src/app/models/playlist.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean;
  searchOption: string = 'catalog';
  placeholder = 'Search Apple Music';
  albums: Album[];
  playlists: Playlist[];
  artists: Artist[];
  tracks: Track[];

  searchTerm = '';

  constructor(private store: Store<any>, private router: Router) {
    this.store.select(selectIsSearchLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectSearchResults).subscribe(results => {
      this.albums = results.albums;
      this.playlists = results.playlists;
      this.artists = results.artists;
      this.tracks = results.tracks;
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.store.dispatch(new searchActions.SearchClear());
  }


  onChange(event) {
    console.log(event);
  }

  search() {
    if (this.searchTerm) {
      this.store.dispatch(new searchActions.SearchClear());
      this.store.dispatch(new searchActions.SearchCatalog({term: this.searchTerm}))
    }
  }

  onArtistSelected(artist: Artist) {
    this.router.navigate(['browse/artists', artist.id]);
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['browse/albums', album.id]);
  }

}
