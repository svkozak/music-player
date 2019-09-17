import { PlayerActionTypes } from '../../player/state/player.actions';
import { Store, Action } from '@ngrx/store';
import { PlayerService } from './../../services/player.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, takeLast, last } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import * as playerActions from './player.actions';
import * as appActions from '../../state/app.actions';
import { PlaybackStates } from '../../models/player.models';


@Injectable()
export class PlayerEffects {

  constructor(private actions$: Actions, private store: Store<any>, private playerService: PlayerService) {}

  @Effect()
  setQueue$ = this.actions$
    .pipe(
      ofType<playerActions.SetQueueAction>(PlayerActionTypes.PlayerSetQueue),
      map(action => action.payload.tracks),
      mergeMap(tracks => this.playerService.setQueue(tracks)),
      // taking an emitted value from setQueue
      map(() => new playerActions.PlayAction())
    )

  @Effect()
  play$ = this.actions$.pipe(
    ofType(PlayerActionTypes.PlayerPlay),
    mergeMap(() => this.playerService.play()),
    // switchMap(() => this.setNowPlayingItem())
    switchMap(() => of(new playerActions.PlayerGetNowPlaying()))
  )

  @Effect()
  pause$ = this.actions$.pipe(
    ofType(PlayerActionTypes.PlayerPause),
    mergeMap(() => this.playerService.pause()),
    switchMap(() => this.setPlaybackState())
  )

  @Effect()
  skipToNext$ = this.actions$.pipe(
    ofType(PlayerActionTypes.PlayerSkipToNext),
    mergeMap(() => this.playerService.skipToNext()),
    switchMap(() => this.setNowPlayingItem())
  )

  @Effect()
  skipToPrev$ = this.actions$.pipe(
    ofType(PlayerActionTypes.PlayerSkipToPrevious),
    mergeMap(() => this.playerService.skipToPrevious()),
    switchMap(() => this.setNowPlayingItem())
  )

  @Effect()
  playNext$ = this.actions$
    .pipe(
      ofType<playerActions.PlayerPlayNext>(PlayerActionTypes.PlayerPlayNext),
      map(action => this.playerService.playNext(action.payload.track)),
      switchMap(() => of(new appActions.AppShowToast({type: 'success'})))
  )

  @Effect()
  playLater$ = this.actions$
    .pipe(
      ofType<playerActions.PlayerPlayLater>(PlayerActionTypes.PlayerPlayLater),
      map(action => this.playerService.playLater(action.payload.track)),
      switchMap(() => of(new appActions.AppShowToast({type: 'success'})))
  )

  // Effect to set playback state
  @Effect()
  playbackState$ = this.actions$.pipe(
    ofType(
      PlayerActionTypes.PlayerPlay,
      PlayerActionTypes.PlayerSkipToNext),
    switchMap(() => this.setPlaybackState())
  )


  @Effect()
  playbackTime$ = this.actions$.pipe(
    ofType(
      PlayerActionTypes.PlayerNowPlaying),
    switchMap(() => this.setPlaybackDuration())
  )

  @Effect()
  getNowPlaying$ = this.actions$.pipe(
    ofType(PlayerActionTypes.PlayerGetNowPlaying),
    mergeMap(() => this.playerService.getNowPlayingItem().pipe(
      map(item => new playerActions.NowPlayingAction({nowPlayingItem: item}))
    ))
  )

  

  // utility to dispatch now playing item
  private setNowPlayingItem(): Observable<Action> {
    return this.playerService.getNowPlayingItem().pipe(
      map(item => new playerActions.NowPlayingAction({nowPlayingItem: item}))
    )
  }


  // utility to dispatch playback state
  private setPlaybackState(): Observable<Action> {
    return this.playerService.getPlaybackState().pipe(
      map(state => new playerActions.SetPlaybackStateAction({playbackState: state.state}))
    )
  }

  private setPlaybackDuration(): Observable<Action> {
    return this.playerService.getCurrentPlaybackDuration().pipe(
      map(duration => new playerActions.SetPlaybacTimeAction({duration: duration}))
    )
  }

}
