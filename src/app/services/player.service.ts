import { Album } from './../models/album.model';
import { PlaybackStates } from './../models/player.models';
import { map, catchError, mergeMap, switchMap, withLatestFrom, last, delay, debounceTime } from 'rxjs/operators';
import { MusicKitService } from './music-kit.service';
import { Injectable, EventEmitter } from '@angular/core';
import { from, Observable, EMPTY, fromEvent, of } from 'rxjs';
import { Track } from '../models/track.model';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentState$;
  playbackState$;
  player;

  constructor(
    private musicKitService: MusicKitService
  ) { 
    this.player = this.musicKitService.musicKit.player;
    this.playbackState$ = this.getPlaybackState();
  }


  play(): Observable<any> {
    return from(this.player.play()).pipe(
      switchMap( () => this.getNowPlayingItem() )
    )
  }

  pause(): Observable<any> {
    this.player.pause();
    return this.getPlaybackState()
  };

  stop(): Observable<any> {
    this.player.stop();
    return this.getPlaybackState();
  };

  skipToNext(): Observable<any> {
    this.player.skipToNextItem();
    return this.getNowPlayingItemWhenChanged();
  }

  skipToPrevious(): Observable<any> {
    this.player.skipToPreviousItem();
    return this.getNowPlayingItemWhenChanged();
    // return from(this.player.skipToNextItem()).pipe(switchMap(() => this.getNowPlayingItem()));
  }

  setQueue(tracks: Track[]): Observable<any> {
    this.pause();
    const ids = tracks.map(track => track.id);
    return from(this.musicKitService.musicKit.setQueue({songs: ids}));
  }

  playNext(track: Track) {
    this.player.queue.prepend(track);
  }

  playLater(track: Track) {
    this.player.queue.append(track);
  }

  // utility to return playback state observable
  getPlaybackState(): Observable<any> {
    return fromEvent(this.musicKitService.musicKit, MusicKit.Events.playbackStateDidChange)
    .pipe(
      debounceTime(200),
      switchMap((state: any) => of(state))
    );
  }

  // utility to return now playing item
  getNowPlayingItem(): Observable<any> {
    return of(this.player.nowPlayingItem).pipe(
      map(item => {
        return item;
      })
      )
  }

  getNowPlayingItemWhenChanged(): Observable<any> {
      return fromEvent(this.musicKitService.musicKit, MusicKit.Events.mediaItemDidChange).pipe(
        switchMap(() => this.getNowPlayingItem())
      )
  }


  getCurrentPlaybackDuration(): Observable<any> {
    return of(this.player.currentPlaybackDuration);
  }

  getCurrentPlaybackTime(): Observable<any> {
    return fromEvent(this.musicKitService.musicKit, MusicKit.Events.playbackTimeDidChange).pipe(
      switchMap(() => of(this.player.currentPlaybackTime))
    );
  }

  getCurrentPlaybackTimeRemaining(): Observable<any> {
    return fromEvent(this.musicKitService.musicKit, MusicKit.Events.playbackTimeDidChange).pipe(
      switchMap(() => of(this.player.currentPlaybackTimeRemaining))
    );
  }

  seekToTime(time: any) {
    this.player.seekToTime(time).then(this.player.play());
  }
  
}
