import { Action } from '@ngrx/store';

export enum PlaylistsActionTypes {
  LoadPlaylists = '[Playlists] Load Playlists',
  LoadPlaylistsSuccess = '[Playlists] Load Playlists Success',
  LoadPlaylistsFailure = '[Playlists] Load Playlists Failure',
}

export class LoadPlaylists implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylists;
}

export class LoadPlaylistsSuccess implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistsSuccess;
  constructor(public payload: { playlists: any }) { }
}

export class LoadPlaylistsFailure implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistsFailure;
  constructor(public payload: { error: any }) { }
}

export type PlaylistsActions = LoadPlaylists | LoadPlaylistsSuccess | LoadPlaylistsFailure;

