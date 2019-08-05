import { Track } from 'src/app/models/track.model';
import { of } from 'rxjs';
import { PlayerService } from './../../services/player.service';
import { PlaybackStates } from './../../models/player.models';
import { selectPlaybackState, selectPlaybackDuration, selectNowPlayingItem } from './../../state/selectors/player.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as playerActions from '../../state/actions/player.actions';
import { Options } from 'ng5-slider';

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

  options: Options = {
    floor: 0,
    ceil: 0,
    step: 1,
    hidePointerLabels: true,
    hideLimitLabels: true
  }

  constructor(private store: Store<any>, private playerService: PlayerService) {
    this.store.select(selectNowPlayingItem).subscribe(item => this.nowPlayingItem = item);
    this.store.select(selectPlaybackState).subscribe(state => this.playbackState = state);
    this.store.select(selectPlaybackDuration).subscribe(duration => this.setPlaybackDuration(duration));

    this.playerService.getCurrentPlaybackTime().subscribe(time => this.currentPlaybackTime = time - this.currentPlaybackDuration);
    this.playerService.getCurrentPlaybackTimeRemaining().subscribe(timeRemaining => this.currentPlaybackTimeRemaining = timeRemaining);

  }

  ngOnInit() {
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

  // ng5-slider options setting
  setPlaybackDuration(duration: any) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = duration;
    newOptions.step = 0.1;
    this.options = newOptions;
  }

  onPositionAdjust(time: any) {
    this.playerService.seekToTime(time);
  }

}
