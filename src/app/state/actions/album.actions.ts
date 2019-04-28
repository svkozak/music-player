import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';

export enum AlbumActionTypes {
  LoadAlbums = '[Album] Load Albums',
  LoadAlbumsSuccess = '[Album] Load Albums Success',
  LoadAlbumsFailure = '[Album] Load Albums Failure',
  LoadAlbum = '[Album] Load Album',
  LoadAlbumSuccess = '[Album] Load Album Success',
  LoadAlbumFailure = '[Album] Load Album Failure',
}

export class LoadAlbums implements Action {
  readonly type = AlbumActionTypes.LoadAlbums;
}

export class LoadAlbumsSuccess implements Action {
  readonly type = AlbumActionTypes.LoadAlbumsSuccess;
  constructor(public payload: { albums: Album[] }) { }
}

export class LoadAlbumsFailure implements Action {
  readonly type = AlbumActionTypes.LoadAlbumsFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadAlbum implements Action {
  readonly type = AlbumActionTypes.LoadAlbum;
  constructor(public payload: { id: string }) {}
}

export class LoadAlbumSuccess implements Action {
  readonly type = AlbumActionTypes.LoadAlbumSuccess;
  constructor(public payload: { album: Album }) { }
}

export class LoadAlbumFailure implements Action {
  readonly type = AlbumActionTypes.LoadAlbumFailure;
  constructor(public payload: { error: any }) { }
}

export type AlbumActions = LoadAlbums | LoadAlbumsSuccess | LoadAlbumsFailure | LoadAlbum | LoadAlbumSuccess | LoadAlbumFailure;

