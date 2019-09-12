import { LoadAlbums } from './../../browse/state/album.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Album } from './../../models/album.model';
import { Component, OnInit } from '@angular/core';
import { selectIsLibraryLoading, selectLibraryAlbums } from '../state/library.selectors';
import * as libraryActions from '../state/library.actions';

@Component({
  selector: 'app-library-albums',
  templateUrl: './library-albums.component.html',
  styleUrls: ['./library-albums.component.scss']
})
export class LibraryAlbumsComponent implements OnInit {

  isLoading: boolean;
  albums: Album[];

  constructor(    
    private store: Store<any>,
    private router: Router
    ) { 
    }

  ngOnInit() {
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectLibraryAlbums).subscribe(albums => this.albums = albums);
    if (this.albums.length === 0) {
      this.store.dispatch(new libraryActions.LoadLibraryAlbums({offset: 0}));
    }
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['library/albums', album.id]);
  }

  onLoadMore() {
    this.store.dispatch(new libraryActions.LoadLibraryAlbums({offset: this.albums.length}));
  }

}
