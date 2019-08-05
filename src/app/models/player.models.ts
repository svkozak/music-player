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

// export enum PlaybackStates {
//   none = "none",
//   loading = "loading",
//   playing = "playing",
//   paused = "paused",
//   stopped = "stopped",
//   ended = "ended",
//   seeking = "seeking",
//   null = "null",
//   waiting = "waiting",
//   stalled = "stalled",
//   completed = "completed"
// }

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