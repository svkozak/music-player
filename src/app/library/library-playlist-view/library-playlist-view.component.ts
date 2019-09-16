import { selectNowPlayingItem } from 'src/app/player/state/player.selectors';
import { Playlist } from 'src/app/models/playlist.model';
import { Track } from 'src/app/models/track.model';
import { selectIsLoadingPlaylists } from './../../browse/state/playlist.selector';
import { selectSelectedLibraryPlaylist, selectIsLibraryLoading } from './../state/library.selectors';
import { PlayerService } from 'src/app/services/player.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as libraryActions from '../state/library.actions';
import { switchMap, map } from 'rxjs/operators';
import * as playerActions from '../../player/state/player.actions';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from 'src/app/widget/playlists-modal/playlists-modal.component';

@Component({
  selector: 'app-library-playlist-view',
  templateUrl: './library-playlist-view.component.html',
  styleUrls: ['./library-playlist-view.component.scss']
})
export class LibraryPlaylistViewComponent implements OnInit {

  isLoading: boolean;
  selectedPlaylist: Playlist;
  tracks: Track[];
  nowPlayingTrackId: string;
  nowPlayingArtworkUrl: string;
  currentPlaybackTimeRemaining: number = 0;

  // to show a modal with playlists
  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(id => this.store.dispatch(new libraryActions.LoadLibraryPlaylist({id: id})));
    this.store.select(selectSelectedLibraryPlaylist).subscribe(playlist => this.selectedPlaylist = playlist);
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        this.nowPlayingTrackId = item._container.id;
        this.nowPlayingArtworkUrl = item.attributes.artwork.url;
      }
    });
  }

  onPlayPlaylist(playlist: Playlist) {
    const tracks: Track[] = playlist.relationships.tracks.data;
    // this.playerService.setQueue(tracks).subscribe();
    this.store.dispatch(new playerActions.SetQueueAction({tracks: tracks}));
  }

  onPlayTrack(track: Track) {
    const tracks: Track[] = this.selectedPlaylist.relationships.tracks.data;
    const newQueue = tracks.slice(tracks.indexOf(track));
    this.store.dispatch(new playerActions.SetQueueAction({tracks: newQueue}));
  }

  onStop() {
    this.store.dispatch(new playerActions.PauseAction());
  }

  playlistArtwork() {
    // check if currently playing track is in the playlist and return the url
  }

  onAddToPlaylist(track: Track) {
    const options: ModalOptions = { backdrop: false, initialState: {track: track} };
    this.bsModalRef = this.modalService.show(PlaylistsModalComponent, options);
  }

  onPlayNext(track: Track) {
    this.store.dispatch(new playerActions.PlayerPlayNext({track: track}))
  }

  onPlayLater(track: Track) {
    this.store.dispatch(new playerActions.PlayerPlayLater({track: track}))
  }

}
