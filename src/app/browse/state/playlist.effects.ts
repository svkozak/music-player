import { LoadPlaylists } from 'src/app/browse/state/playlists.actions';
import { PlaylistsActionTypes } from './playlists.actions';
import { AlbumActionTypes } from './album.actions';
import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as playlistActions from './playlists.actions';



@Injectable()
export class PlaylistEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadPlaylists$ = this.actions$.pipe(
    ofType(PlaylistsActionTypes.LoadPlaylists),
    mergeMap(() => this.api.getCatalogCharts()
      .pipe(
        map(response => new playlistActions.LoadPlaylistsSuccess({playlists: response.results.playlists[0].data})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadPlaylist$ = this.actions$.pipe(
    ofType<playlistActions.LoadPlaylist>(PlaylistsActionTypes.LoadPlaylist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogPlaylist(id).pipe(
      map(playlist => new playlistActions.LoadPlaylistSuccess({playlist: playlist}))
    ))
  )
  



}
