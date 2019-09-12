import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Playlist } from 'src/app/models/playlist.model';
import { Component, OnInit } from '@angular/core';
import { selectIsLibraryLoading, selectLibraryPlaylists } from '../state/library.selectors';
import * as libraryActions from '../state/library.actions';

@Component({
  selector: 'app-library-playlists',
  templateUrl: './library-playlists.component.html',
  styleUrls: ['./library-playlists.component.scss']
})
export class LibraryPlaylistsComponent implements OnInit {

  isLoading: boolean;
  playlists: Playlist[];

  constructor(    
    private store: Store<any>,
    private router: Router
    ) { 

    }

  ngOnInit() {
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectLibraryPlaylists).subscribe(playlists => this.playlists = playlists);
    if (this.playlists.length === 0) {
      this.store.dispatch(new libraryActions.LoadLibraryPlaylists({offset: 0}));
    }
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate(['library/playlists', playlist.id]);
  }

  onLoadMore() {
    this.store.dispatch(new libraryActions.LoadLibraryPlaylists({offset: this.playlists.length}));
  }

}
