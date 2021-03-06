import { PlaybackStates } from './../../models/player.models';
import { Playlist } from 'src/app/models/playlist.model';
import { PlayerService } from './../../services/player.service';
import { LoadAlbum } from '../state/album.actions';
import { selectIsLoading } from '../state/album.selectors';
import { Store } from '@ngrx/store';
import { Track } from './../../models/track.model';
import { Album } from './../../models/album.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { selectSelectedAlbum } from 'src/app/browse/state/album.selectors';
import * as playerActions from '../../player/state/player.actions';
import * as libraryActions from '../../library/state/library.actions';
import { selectNowPlayingItem, selectPlaybackState } from 'src/app/player/state/player.selectors';
import { selectIsLibraryLoading } from 'src/app/library/state/library.selectors';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from 'src/app/widget/playlists-modal/playlists-modal.component';
import { selectIsLoggedIn } from 'src/app/state/app.selectors';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  isLoading: boolean;
  isLibraryLoading: boolean;
  selectedAlbum: Album;
  tracks: Track[] = [];
  nowPlayingTrackId: string;
  playbackState: PlaybackStates;
  currentPlaybackTimeRemaining;
  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService,
    private router: Router,
    private modalService: BsModalService
    ) {
    }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(id => this.store.dispatch(new LoadAlbum({id: id})));
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.store.select(selectSelectedAlbum).subscribe(album => this.selectedAlbum = album);
    this.store.select(selectIsLoading).subscribe(val => this.isLoading = val);
    this.store.select(selectNowPlayingItem).subscribe(item => {
        if (item) {
          this.nowPlayingTrackId = item.id;
        }
      });
    this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLibraryLoading = isLoading);
    this.store.select(selectPlaybackState).subscribe(playbackState => this.playbackState = playbackState);
  }

  ngOnDestroy() {
  }

  onPlayAlbum(album: Album) {
    const tracks: Track[] = album.relationships.tracks.data;
    this.store.dispatch(new playerActions.SetQueueAction({tracks: tracks}));
  }

  onPlayTrack(track: Track) {
    let albumTracks: Track[] = this.selectedAlbum.relationships.tracks.data;
    let queue = albumTracks.slice(albumTracks.indexOf(track));
    this.store.dispatch(new playerActions.SetQueueAction({tracks: queue}));
  }

  onSelectArtist(id: string) {
    this.router.navigate(['browse/artists', id]);
  }

  onStop() {
    this.store.dispatch(new playerActions.PauseAction());
  }

  onAddToLibrary(track?: Track, album?: Album) {
    const type  = track.type || album.type;
    const id = track.id || album.id;
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
