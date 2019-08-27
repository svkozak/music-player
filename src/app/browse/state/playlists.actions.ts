import { Playlist } from '../../models/playlist.model';
import { Action } from '@ngrx/store';

export enum PlaylistsActionTypes {
  LoadPlaylists = '[Playlists] Load Playlists',
  LoadPlaylistsSuccess = '[Playlists] Load Playlists Success',
  LoadPlaylistsFailure = '[Playlists] Load Playlists Failure',
  LoadPlaylist = '[Playlists] Load Playlist',
  LoadPlaylistSuccess = '[Playlists] Load Playlist Success',
  LoadPlaylistFailure = '[Playlists] Load Playlist Failure',
}

export class LoadPlaylists implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylists;
}

export class LoadPlaylistsSuccess implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistsSuccess;
  constructor(public payload: { playlists: Playlist[] }) { }
}

export class LoadPlaylistsFailure implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistsFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadPlaylist implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylist;
  constructor(public payload: { id: string }) {}
}

export class LoadPlaylistSuccess implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistSuccess;
  constructor(public payload: { playlist: Playlist }) { }
}

export class LoadPlaylistFailure implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylistFailure;
  constructor(public payload: { error: any }) { }
}

export type PlaylistsActions = 
LoadPlaylists | 
LoadPlaylistsSuccess | 
LoadPlaylistsFailure |
LoadPlaylist | 
LoadPlaylistSuccess | 
LoadPlaylistFailure;

