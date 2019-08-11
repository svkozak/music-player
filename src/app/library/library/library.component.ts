import { selectRecentlyAddedItems } from './../state/library.selectors';
import { selectIsLibraryLoading } from '../state/library.selectors';
import { Playlist } from '../../models/playlist.model';
import { Album } from '../../models/album.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as libraryActions from '../state/library.actions';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  isLoading: boolean;
  recentlyAddedItems: any[];


  constructor(
    private store: Store<any>,
    private router: Router
    ) {
      this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
      this.store.select(selectRecentlyAddedItems).subscribe(items => this.recentlyAddedItems = items);
    }

  ngOnInit() {
    if (this.recentlyAddedItems.length === 0) {
      this.store.dispatch(new libraryActions.LoadMoreRecentlyAdded({offset: 0}));
    }
  }

  ngOnDestroy() {
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['library/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate(['library/playlists', playlist.id]);
  }

  loadMore() {
    this.store.dispatch(new libraryActions.LoadMoreRecentlyAdded({offset: this.recentlyAddedItems.length}));
  }

}
