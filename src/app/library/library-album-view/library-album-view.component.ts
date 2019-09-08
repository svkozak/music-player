import { selectNowPlayingItem } from './../../state/selectors/player.selectors';
import { selectSelectedLibraryAlbum, selectIsLibraryLoading } from '../state/library.selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Track } from './../../models/track.model';
import { Album } from './../../models/album.model';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { map} from 'rxjs/operators';
import * as libraryActions from '../state/library.actions';
import * as playerActions from '../../state/actions/player.actions';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from 'src/app/widget/playlists-modal/playlists-modal.component';

@Component({
  selector: 'app-library-album-view',
  templateUrl: './library-album-view.component.html',
  styleUrls: ['./library-album-view.component.scss']
})
export class LibraryAlbumViewComponent implements OnInit {

  isLoading: boolean;
  selectedAlbum: Album;
  tracks: Track[] = [];
  nowPlayingTrackId: string;
  currentPlaybackTimeRemaining;

  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService,
    private modalService: BsModalService
  ) {
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.route.params.pipe(map(param => param.id)).subscribe(id => this.store.dispatch(new libraryActions.LoadLibraryAlbum({id: id})));
    this.store.select(selectSelectedLibraryAlbum).subscribe(album => this.selectedAlbum = album);
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        console.log(item);
        this.nowPlayingTrackId = item._container.id;
      }
    });
  }

  ngOnInit() {
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

  onAddToPlaylist(track: Track) {
    const options: ModalOptions = { backdrop: false, initialState: {track: track} };
    this.bsModalRef = this.modalService.show(PlaylistsModalComponent, options);
  }

  onStop() {
    this.store.dispatch(new playerActions.PauseAction());
  }

}
