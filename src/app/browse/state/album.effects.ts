import { AlbumActionTypes } from './album.actions';
import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as albumActions from './album.actions';



@Injectable()
export class AlbumEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadAlbums$ = this.actions$.pipe(
    ofType(AlbumActionTypes.LoadAlbums),
    mergeMap(() => this.api.getCatalogGenres()
    .pipe(
        map(results => new albumActions.LoadAlbumsSuccess({albums: results.albums[0].data})),
        catchError(() => EMPTY)
    ))
  )


  @Effect()
  loadAlbum$ = this.actions$.pipe(
    ofType<albumActions.LoadAlbum>(AlbumActionTypes.LoadAlbum),
    map(action => action.payload.id),
    mergeMap(id => this.api.getAlbum(id).pipe(
      map(album => new albumActions.LoadAlbumSuccess({album: album}))
    ))
  )

  



}
