import { Playlist } from 'src/app/models/playlist.model';
import { Track } from 'src/app/models/track.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as libraryActions from './../../library/state/library.actions';
import { selectLibraryPlaylists } from 'src/app/library/state/library.selectors';

@Component({
  selector: 'app-playlists-modal',
  templateUrl: './playlists-modal.component.html',
  styleUrls: ['./playlists-modal.component.scss']
})
export class PlaylistsModalComponent implements OnInit {

  title: string;
  closeBtnName: string;
  libraryPlaylists: Playlist[] = [];
  track: Track;

  constructor(public bsModalRef: BsModalRef, private store: Store<any>) {}

  ngOnInit() {
    this.store.select(selectLibraryPlaylists).subscribe(playlists => {
      if (playlists.length < 1) {
        this.store.dispatch(new libraryActions.LoadLibraryPlaylists());
      } else {
        this.libraryPlaylists = playlists;
      }
    })
  }

  loadMore() {
    this.store.dispatch(new libraryActions.LoadLibraryPlaylists({offset: this.libraryPlaylists.length}));
  }

  addToPlaylist(playlist: Playlist, track: Track) {
    this.bsModalRef.hide();
    this.store.dispatch(new libraryActions.AddToPlaylist({playlistId: playlist.id, track: track}))
  }

}
