import { Playlist } from 'src/app/models/playlist.model';
import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';

export enum LibraryActionTypes {
  LoadLibraryAlbums = '[Library] Load library albums',
  LoadLibraryAlbumsSuccess = '[Library] Load library albums success',
  LoadLibraryAlbumsFailure = '[Library] Load library albums failure',
  LoadLibraryPlaylists = '[Library] Load library playlists',
  LoadLibraryPlaylistsSuccess = '[Library] Load library playlists success',
  LoadLibraryPlaylistsFailure = '[Library] Load library playlists failure',

  LoadLibraryAlbum = '[Library] Load library album',
  LoadLibraryAlbumSuccess = '[Library] Load library album success',
  LoadLibraryAlbumFailure = '[Library] Load library album failure',
  LoadLibraryPlaylist = '[Library] Load library playlist',
  LoadLibraryPlaylistSuccess = '[Library] Load library playlist success',
  LoadLibraryPlaylistFailure = '[Library] Load library playlist failure'
}

// load multiple albums or playlists from library 

export class LoadLibraryAlbums implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbums;
}

export class LoadLibraryAlbumsSuccess implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbumsSuccess;
  constructor(public payload: { albums: Album[] }) { }
}

export class LoadLibraryAlbumsFailure implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbumsFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadLibraryPlaylists implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylists;
}

export class LoadLibraryPlaylistsSuccess implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylistsSuccess;
  constructor(public payload: { playlists: Playlist[] }) { }
}

export class LoadLibraryPlaylistsFailure implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylistsFailure;
  constructor(public payload: { error: any }) { }
}

// load single album or playlist from library

export class LoadLibraryAlbum implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbum;
  constructor(public payload: { id: string }) {}
}

export class LoadLibraryAlbumSuccess implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbumSuccess;
  constructor(public payload: { album: Album }) { }
}

export class LoadLibraryAlbumFailure implements Action {
  readonly type = LibraryActionTypes.LoadLibraryAlbumFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadLibraryPlaylist implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylist;
  constructor(public payload: { id: string }) {}
}

export class LoadLibraryPlaylistSuccess implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylistSuccess;
  constructor(public payload: { playlist: Playlist }) { }
}

export class LoadLibraryPlaylistFailure implements Action {
  readonly type = LibraryActionTypes.LoadLibraryPlaylistFailure;
  constructor(public payload: { error: any }) { }
}



export type LibraryActions = 
LoadLibraryAlbums |
LoadLibraryAlbumsSuccess |
LoadLibraryAlbumsFailure |
LoadLibraryPlaylists |
LoadLibraryPlaylistsSuccess |
LoadLibraryPlaylistsFailure |
LoadLibraryAlbum |
LoadLibraryAlbumSuccess |
LoadLibraryAlbumFailure |
LoadLibraryPlaylist |
LoadLibraryPlaylistSuccess |
LoadLibraryPlaylistFailure;

