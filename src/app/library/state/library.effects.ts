import { LibraryActionTypes, LoadLibraryPlaylistSuccess } from './library.actions';
import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from './../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as libraryActions from './library.actions';



@Injectable()
export class LibraryEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadLibraryAlbums$ = this.actions$.pipe(
    ofType(LibraryActionTypes.LoadLibraryAlbums),
    mergeMap(() => this.api.getAllLibraryAlbums()
      .pipe(
        map(albums => new libraryActions.LoadLibraryAlbumsSuccess({albums: albums})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadLibraryAlbum$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryAlbum>(LibraryActionTypes.LoadLibraryAlbum),
    map(action => action.payload.id),
    mergeMap(id => this.api.getLibraryAlbum(id).pipe(
      map(album => new libraryActions.LoadLibraryAlbumSuccess({album: album}))
    ))
  )

  @Effect()
  loadLibraryPlaylists$ = this.actions$.pipe(
    ofType(LibraryActionTypes.LoadLibraryPlaylists),
    mergeMap(() => this.api.getAllLibraryPlaylists()
      .pipe(
        map(playlists => new libraryActions.LoadLibraryPlaylistsSuccess({playlists: playlists})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadLibraryPlaylist$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryPlaylist>(LibraryActionTypes.LoadLibraryPlaylist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getLibraryPlaylist(id).pipe(
      map(playlist => new libraryActions.LoadLibraryPlaylistSuccess({playlist: playlist}))
    ))
  )
  



}
