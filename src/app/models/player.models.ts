import { Attributes } from './album.model';
export interface MediaItem {
  id: string;
  attributes?: Attributes;
  _container?: { id: string;}
}


export enum PlaybackStates {
  none,
  loading ,
  playing,
  paused,
  stopped,
  ended,
  seeking,
  null,
  waiting,
  stalled,
  completed
}

export enum RepeatMode {
  all,
  none,
  one
}

export enum ShuffleMode {
  off,
  songs
}

export enum PlayerBitrate {
  HIGH,
  STANDARD
}


export interface Player {

}