import { LibraryActionTypes, LoadLibraryAlbumSuccess } from './../actions/library.actions';
import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from './../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as libraryActions from '../actions/library.actions';



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

  



}
