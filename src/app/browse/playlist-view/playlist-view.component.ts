import { Playlist } from './../../models/playlist.model';
import * as playerActions from '../../state/actions/player.actions';
import { selectNowPlayingItem } from '../../state/selectors/player.selectors';
import { selectSelectedPlaylist, selectIsLoadingPlaylists } from '../state/playlist.selector';
import { LoadPlaylist } from '../state/playlists.actions';
import { PlayerService } from '../../services/player.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { switchMap, map } from 'rxjs/operators';
import { selectIsLibraryLoading } from 'src/app/library/state/library.selectors';
import * as libraryActions from '../../library/state/library.actions';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from 'src/app/widget/playlists-modal/playlists-modal.component';
import { selectIsLoggedIn } from 'src/app/state/selectors/app.selectors';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  isLoggedIn: boolean;
  isLoading: boolean;
  isLibraryLoading: boolean;
  selectedPlaylist: Playlist;
  tracks: Track[];
  nowPlayingTrackId: string;
  currentPlaybackTimeRemaining: number = 0;
  libraryPlaylists: Playlist[];

  // to show a modal with playlists
  bsModalRef: BsModalRef;



  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService,
    private modalService: BsModalService
  ) { 

  }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(val => this.store.dispatch(new LoadPlaylist({id: val})));
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.store.select(selectSelectedPlaylist).subscribe(playlist => this.selectedPlaylist = playlist);
    this.store.select(selectIsLoadingPlaylists).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        this.nowPlayingTrackId = item.id;
      }
    });
    this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLibraryLoading = isLoading);
  }

  onPlayPlaylist(playlist: Playlist) {
    const tracks: Track[] = playlist.relationships.tracks.data;
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

  onAddToLibrary(track?: Track, playlist?: Playlist) {
    const type  = track.type || playlist.type;
    const id = track.id || playlist.id;
    this.store.dispatch(new libraryActions.AddToLibrary({type: type, id: id}));
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
