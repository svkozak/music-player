import { Album } from './../../models/album.model';
import { selectLibraryArtists, selectSelectedLibraryArtist } from './../state/library.selectors';
import { Artist } from './../../models/artist.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLibraryLoading } from '../state/library.selectors';
import * as libraryActions from '../state/library.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-artists',
  templateUrl: './library-artists.component.html',
  styleUrls: ['./library-artists.component.scss']
})
export class LibraryArtistsComponent implements OnInit {

  isLoading: boolean;
  artists: Artist[];
  selectedArtist: Artist;

  constructor(    
    private store: Store<any>,
    private router: Router
    ) {
    }

  ngOnInit() {
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectLibraryArtists).subscribe(artists => this.artists = artists);
    this.store.select(selectSelectedLibraryArtist).subscribe(artist => this.selectedArtist = artist);
    if (this.artists.length === 0) {
      this.store.dispatch(new libraryActions.LoadLibraryArtists({offset: 0}));
    }
  }
  
  onArtistSelected(artist: Artist) {
    this.store.dispatch(new libraryActions.LoadLibraryArtist({id: artist.id}));
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['library/albums', album.id]);
  }

  onLoadMore() {
    this.store.dispatch(new libraryActions.LoadLibraryArtists({offset: this.artists.length}));
  }
}
