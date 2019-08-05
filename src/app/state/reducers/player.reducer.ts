import { Album } from './../../models/album.model';
import { PlaybackStates } from './../../models/player.models';
import { PlayerActions, PlayerActionTypes, NowPlayingAction, SetPlaybackStateAction, SetQueueAction } from './../actions/player.actions';
import { Action } from '@ngrx/store';


export interface PlayerState {
  selectedAlbum: Album,
  playbackState: PlaybackStates,
  isShuffling: boolean,
  nowPlayingItem: any,
  currentPlaybackDuration: any,
  currentPlaybackTime: any
}

export const initialState: PlayerState = {
  selectedAlbum: null,
  playbackState: PlaybackStates.none,
  isShuffling: false,
  nowPlayingItem: null,
  currentPlaybackDuration: 0,
  currentPlaybackTime: 0
};

export function playerReducer(state: PlayerState = initialState, action: PlayerActions): PlayerState {
  switch (action.type) {

    case PlayerActionTypes.PlayerSetQueue: {
      return {
        ...state
      }
    }

    case PlayerActionTypes.PlayerPlay: {
      return {
        ...state
      }
    }

    case PlayerActionTypes.PlayerPause: {
      return {
        ...state
      }
    }

    case PlayerActionTypes.PlayerNowPlaying: {
      return {
        ...state,
        nowPlayingItem: action.payload
      }
    }

    case PlayerActionTypes.PlayerSetPlaybackState: {
      return {
        ...state,
        playbackState: action.payload.playbackState
      }
    }

    case PlayerActionTypes.PlayerSetPlaybackDuration: {
      return {
        ...state,
        currentPlaybackDuration: action.payload.duration
      }
    }

    case PlayerActionTypes.PlayerSetCurrentPlaybackTime: {
      return {
        ...state,
        currentPlaybackTime: action.payload.time
      }
    }

    default:
      return state;
  }
}
