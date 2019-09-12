import { activities } from './../../state/app.constants';
import { BrowseActionTypes } from './browse.actions';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as browseActions from './browse.actions';



@Injectable()
export class BrowseEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadCatalogArtist$ = this.actions$.pipe(
    ofType<browseActions.LoadCatalogArtist>(BrowseActionTypes.LoadCatalogArtist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogArtist(id).pipe(
      map(artist => new browseActions.LoadCatalogArtistSuccess({ artist: artist }))
    ))
  )

  @Effect()
  loadActivity$ = this.actions$.pipe(
    ofType<browseActions.LoadActivity>(BrowseActionTypes.LoadActivity),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogActivity(id).pipe(
      map(activity => new browseActions.LoadActivitySuccess({ selectedActivity: activity }))
    ))
  )

  @Effect()
  loadActivities$ = this.actions$.pipe(
    ofType<browseActions.LoadActivities>(BrowseActionTypes.LoadActivities),
    mergeMap(() => this.api.getCatalogActivities().pipe(
      map(activities => new browseActions.LoadActivitiesSuccess({ activities: activities }))
    ))
  )

  @Effect()
  loadActivityPlaylists$ = this.actions$.pipe(
    ofType<browseActions.LoadActivityPlaylists>(BrowseActionTypes.LoadActivityPlaylists),
    map(action => action.payload.playlists.map(playlist => playlist.id)),
    mergeMap(ids => this.api.getCatalogPlaylists(ids).pipe(
      map(playlists => new browseActions.LoadActivityPlaylistsSuccess({ playlists: playlists }))
    ))
  )

  

}
