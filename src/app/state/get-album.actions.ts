import { Action } from '@ngrx/store';

export enum GetAlbumActionTypes {
  LoadGetAlbums = '[GetAlbum] Load GetAlbums',
  LoadGetAlbumsSuccess = '[GetAlbum] Load GetAlbums Success',
  LoadGetAlbumsFailure = '[GetAlbum] Load GetAlbums Failure',
}

export class LoadGetAlbums implements Action {
  readonly type = GetAlbumActionTypes.LoadGetAlbums;
}

export class LoadGetAlbumsSuccess implements Action {
  readonly type = GetAlbumActionTypes.LoadGetAlbumsSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadGetAlbumsFailure implements Action {
  readonly type = GetAlbumActionTypes.LoadGetAlbumsFailure;
  constructor(public payload: { error: any }) { }
}

export type GetAlbumActions = LoadGetAlbums | LoadGetAlbumsSuccess | LoadGetAlbumsFailure;

