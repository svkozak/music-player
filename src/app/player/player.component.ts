import { Track } from 'src/app/models/track.model';
import { of } from 'rxjs';
import { PlayerService } from './../services/player.service';
import { PlaybackStates } from './../models/player.models';
import { selectPlaybackState, selectPlaybackDuration, selectNowPlayingItem } from './state/player.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as playerActions from './state/player.actions';
import { Router } from '@angular/router';

declare var MusicKit: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playbackState: PlaybackStates;

  nowPlayingItem: any;
  currentPlaybackDuration = 0;
  currentPlaybackTime = 0;
  currentPlaybackTimeRemaining = 0;

  constructor(private store: Store<any>, private playerService: PlayerService, private router: Router) {
  }

  ngOnInit() {
    this.store.select(selectNowPlayingItem).subscribe(item => this.nowPlayingItem = item);
    this.store.select(selectPlaybackState).subscribe(state => this.playbackState = state);
    this.store.select(selectPlaybackDuration).subscribe(duration => this.currentPlaybackDuration = duration);
    this.playerService.getCurrentPlaybackTime().subscribe(time => this.currentPlaybackTime = time);
    this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);
    this.playerService.mediaItemDidChange$.subscribe(() => this.store.dispatch(new playerActions.PlayerGetNowPlaying()));
  }

  skipToPrevious(){
    return this.store.dispatch(new playerActions.SkipToPreviousAction());
  }

  skipToNext(){
    this.store.dispatch(new playerActions.SkipToNextAction());
  }

  togglePlayPause(){
    if (this.playbackState === PlaybackStates.paused) {
      this.store.dispatch(new playerActions.PlayAction());
    } else {
      this.store.dispatch(new playerActions.PauseAction());
    }
  }

  isLoading(): boolean {
    return this.playbackState === PlaybackStates.loading || 
      this.playbackState === PlaybackStates.stalled || 
      this.playbackState === PlaybackStates.waiting || 
      this.playbackState === PlaybackStates.seeking
  }

  isPlaying(): boolean {
    return this.playbackState === PlaybackStates.playing;
  }

  onPositionAdjust(time: any) {
    this.playerService.seekToTime(time);
  }

  onArtistClick(id: string) {
    this.router.navigate(['browse/artists', id])
  }

  onTrackClick(id: string) {
    this.router.navigate(['browse/albums', id])
  }
  
  openAlbum() {
    this.router.navigate(['browse/albums', this.nowPlayingItem.relationships.albums.data[0].id])
  }

}
