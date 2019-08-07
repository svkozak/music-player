import { LoadLibraryAlbum } from './../../library/state/library.actions';
import { selectSelectedLibraryAlbum } from './../../library/state/library.selectors';
import { PlayerService } from './../../services/player.service';
import { LoadAlbum } from '../state/album.actions';
import { selectIsLoading, selectAlbumRelationships } from '../state/album.selectors';
import { Store } from '@ngrx/store';
import { Track } from './../../models/track.model';
import { ApiServiceService } from './../../services/api-service.service';
import { Album } from './../../models/album.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { selectSelectedAlbum } from 'src/app/browse/state/album.selectors';
import * as playerActions from '../../state/actions/player.actions';
import { selectNowPlayingItem } from 'src/app/state/selectors/player.selectors';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  selectedAlbum: Album;
  selectedLibraryAlbum: Album;
  tracks: Track[] = [];
  nowPlayingTrackId: string;
  currentPlaybackTimeRemaining;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private playerService: PlayerService
    ) {

      console.log(this.route.url)

      this.route.params.pipe(map(param => param)).subscribe(val => {
        console.log(val);
        const id = val.id;
        this.store.dispatch(new LoadAlbum({id: id}));
        this.store.dispatch(new LoadLibraryAlbum({id: id}));
      });

      this.store.select(selectSelectedAlbum).subscribe(album => this.selectedAlbum = album);
      this.store.select(selectSelectedLibraryAlbum).subscribe(album => this.selectedAlbum = album);

      this.store.select(selectIsLoading).subscribe(val => this.isLoading = val);
      this.store.select(selectNowPlayingItem).subscribe(item => {
          if (item) {
            this.nowPlayingTrackId = item.nowPlayingItem.id;
          }
        });
      this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);
    }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  onPlayAlbum(album: Album) {
    const tracks: Track[] = album.relationships.tracks.data;
    // this.playerService.setQueue(tracks).subscribe();
    this.store.dispatch(new playerActions.SetQueueAction({tracks: tracks}));
  }

  onPlayTrack(track: Track) {
    let albumTracks: Track[] = this.selectedAlbum.relationships.tracks.data;
    let queue = albumTracks.slice(albumTracks.indexOf(track));
    console.log(queue.length);
    this.store.dispatch(new playerActions.SetQueueAction({tracks: queue}));
  }

  onStop() {
    this.store.dispatch(new playerActions.PauseAction());
    // this.playerService.pause();
  }


}
