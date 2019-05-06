import { LoadPlaylists } from 'src/app/state/actions/playlists.actions';
import { PlaylistsActionTypes } from './../actions/playlists.actions';
import { AlbumActionTypes } from './../actions/album.actions';
import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from './../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as albumActions from '../actions/album.actions';
import * as playlistActions from '../actions/playlists.actions';



@Injectable()
export class PlaylistEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadPlaylists$ = this.actions$.pipe(
    ofType(PlaylistsActionTypes.LoadPlaylists),
    mergeMap(() => this.api.getDancePlaylists()
      .pipe(
        map(results => new playlistActions.LoadPlaylistsSuccess({playlists: results.playlists[0].data})),
        catchError(() => EMPTY)
    ))
  )


  // @Effect()
  // loadAlbum$ = this.actions$.pipe(
  //   ofType<albumActions.LoadAlbum>(AlbumActionTypes.LoadAlbum),
  //   map(action => action.payload.id),
  //   mergeMap(id => this.api.getAlbum(id).pipe(
  //     map(album => new albumActions.LoadAlbumSuccess({album: album}))
  //   ))
  // )

  



}
