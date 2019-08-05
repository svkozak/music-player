import { State } from './../reducers/index';
import { PlayerState } from './../reducers/player.reducer';
import { createSelector } from '@ngrx/store';


export const selectPlayerState = (state: State) => state.player

export const selectPlaybackState = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.playbackState
)

export const selectPlaybackDuration = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.currentPlaybackDuration
)

export const selectNowPlayingItem = createSelector(
  selectPlayerState,
  (state: PlayerState) => state.nowPlayingItem
)

