import { Album } from '../../models/album.model';
import { PlaybackStates, MediaItem } from '../../models/player.models';
import { Action } from '@ngrx/store';
import { Track } from 'src/app/models/track.model';

export enum PlayerActionTypes {
  PlayerSetQueue = '[Player] Set Queue',
  PlayerPlay = '[Player] Play',
  PlayerPause = '[Player] Pause',
  PlayerStop = '[Player] Stop',
  PlayerMute = '[Player] Mute',
  PlayerSkipToNext = '[Player] Skip to next',
  PlayerSkipToPrevious = '[Player] Skip to previous',
  PlayerSeekToTime = '[Player] Seek to time',
  PlayerNowPlaying = '[Player] Set now playing item',
  PlayerSetPlaybackState = '[Player] Set playback state',
  PlayerSetPlaybackDuration = '[Player] Set playback duration',
  PlayerSetCurrentPlaybackTime = '[Player] Set playback time',

  PlayerPlayNext = '[Player] Play next',
  PlayerPlayLater = '[Player] Play later'
}

export class SetQueueAction implements Action {
  readonly type = PlayerActionTypes.PlayerSetQueue;
  constructor(public payload: { tracks: Track[] }) { }
}

export class PlayAction implements Action {
  readonly type = PlayerActionTypes.PlayerPlay;
}

export class PauseAction implements Action {
  readonly type = PlayerActionTypes.PlayerPause;
}

export class StopAction implements Action {
  readonly type = PlayerActionTypes.PlayerStop;
}

export class MuteAction implements Action {
  readonly type = PlayerActionTypes.PlayerMute;
}

export class SkipToNextAction implements Action {
  readonly type = PlayerActionTypes.PlayerSkipToNext;
}

export class SkipToPreviousAction implements Action {
  readonly type = PlayerActionTypes.PlayerSkipToPrevious;
}

export class SeekToTimeAction implements Action {
  readonly type = PlayerActionTypes.PlayerSeekToTime;
  constructor(public payload: { time: any }) { }
}

export class NowPlayingAction implements Action {
  readonly type = PlayerActionTypes.PlayerNowPlaying;
  constructor(public payload: { nowPlayingItem: MediaItem }) { }
}

export class SetPlaybackStateAction implements Action {
  readonly type = PlayerActionTypes.PlayerSetPlaybackState;
  constructor(public payload: { playbackState: PlaybackStates }) { }
}

export class SetPlaybacTimeAction implements Action {
  readonly type = PlayerActionTypes.PlayerSetPlaybackDuration;
  constructor(public payload: { duration: any }) { }
}

export class SetPlaybackPositionAction implements Action {
  readonly type = PlayerActionTypes.PlayerSetCurrentPlaybackTime;
  constructor(public payload: { time: any }) { }
}

export class PlayerPlayNext implements Action {
  readonly type = PlayerActionTypes.PlayerPlayNext;
  constructor(public payload: { track: any }) { }
}

export class PlayerPlayLater implements Action {
  readonly type = PlayerActionTypes.PlayerPlayLater;
  constructor(public payload: { track: any }) { }
}



export type PlayerActions = 
  SetQueueAction |
  PlayAction |
  PauseAction | 
  StopAction | 
  MuteAction | 
  SkipToNextAction | 
  SkipToPreviousAction | 
  SeekToTimeAction | 
  NowPlayingAction | 
  SetPlaybackStateAction | 
  SetPlaybacTimeAction |
  SetPlaybackPositionAction |
  PlayerPlayNext |
  PlayerPlayLater
  ;
