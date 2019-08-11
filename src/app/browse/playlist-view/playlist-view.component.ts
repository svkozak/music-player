import * as playerActions from '../../state/actions/player.actions';
import { selectNowPlayingItem } from '../../state/selectors/player.selectors';
import { selectSelectedPlaylist, selectIsLoadingPlaylists } from '../state/playlist.selector';
import { LoadPlaylist } from '../state/playlists.actions';
import { PlayerService } from '../../services/player.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { Track } from 'src/app/models/track.model';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit {

  isLoading: boolean;
  selectedPlaylist: Playlist;
  tracks: Track[];
  nowPlayingTrackId: string;
  currentPlaybackTimeRemaining: number = 0;


  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService
  ) { 
    this.route.params.pipe(map(param => param.id)).subscribe(val => this.store.dispatch(new LoadPlaylist({id: val})));
    this.store.select(selectSelectedPlaylist).subscribe(playlist => this.selectedPlaylist = playlist);
    this.store.select(selectIsLoadingPlaylists).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        this.nowPlayingTrackId = item.id;
      }
    });
  this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);

  }

  ngOnInit() {
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

}
