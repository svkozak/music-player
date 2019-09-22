import { activities } from './../../state/app.constants';
import { BrowseActionTypes, LoadCatalogGenres } from './browse.actions';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import * as browseActions from './browse.actions';
import * as appActions from '../../state/app.actions';



@Injectable()
export class BrowseEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadCatalogArtist$ = this.actions$.pipe(
    ofType<browseActions.LoadCatalogArtist>(BrowseActionTypes.LoadCatalogArtist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogArtist(id).pipe(
      map(artist => new browseActions.LoadCatalogArtistSuccess({ artist: artist })),
      catchError(error => of(new browseActions.LoadCatalogArtistFailure({error : error})))
    ))
  )

  @Effect()
  loadActivity$ = this.actions$.pipe(
    ofType<browseActions.LoadActivity>(BrowseActionTypes.LoadActivity),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogActivity(id).pipe(
      map(activity => new browseActions.LoadActivitySuccess({ selectedActivity: activity })),
      catchError(error => of(new browseActions.LoadActivityFailure({error : error})))
    ))
  )

  @Effect()
  loadActivities$ = this.actions$.pipe(
    ofType<browseActions.LoadActivities>(BrowseActionTypes.LoadActivities),
    mergeMap(() => this.api.getCatalogActivities().pipe(
      map(activities => new browseActions.LoadActivitiesSuccess({ activities: activities })),
      catchError(error => of(new browseActions.LoadActivitiesFailure({error : error})))
    ))
  )

  // load activity playlists after activity successfully loaded
  @Effect()
  loadActivPlaylists$ = this.actions$.pipe(
    ofType<browseActions.LoadActivitySuccess>(BrowseActionTypes.LoadActivitySuccess),
    map(action => action.payload.selectedActivity.relationships.playlists.data.map(playlist => playlist.id)),
    mergeMap(ids => this.api.getCatalogPlaylists(ids).pipe(
      map(playlists => new browseActions.LoadActivityPlaylistsSuccess({ playlists: playlists })),
      catchError(error => of(new browseActions.LoadActivityPlaylistsFailure({error : error})))
    ))
  )

  @Effect()
  loadGenres$ = this.actions$.pipe(
    ofType<browseActions.LoadCatalogGenres>(BrowseActionTypes.LoadCatalogGenres),
    mergeMap(() => this.api.getCatalogGenres().pipe(
      map(genres => new browseActions.LoadCatalogGenresSuccess({ genres: genres })),
      catchError(error => of(new browseActions.LoadCatalogGenresFailure({error : error})))
    ))
  )

  @Effect()
  loadGenre$ = this.actions$.pipe(
    ofType<browseActions.LoadCatalogGenre>(BrowseActionTypes.LoadCatalogGenre),
    map(action => action.payload.id),
    mergeMap(id => this.api.getCatalogCharts(id, 20).pipe(
      map(response => new browseActions.LoadCatalogGenreSuccess({ selectedGenre: response.results })),
      catchError(error => of(new browseActions.LoadCatalogGenreFailure({error : error})))
    ))
  )
  
  @Effect()
  browseErrorToast$ = this.actions$.pipe(
    ofType(
      BrowseActionTypes.LoadCatalogArtistFailure,
      BrowseActionTypes.LoadActivityFailure,
      BrowseActionTypes.LoadActivitiesFailure,
      BrowseActionTypes.LoadActivityPlaylistsFailure,
      BrowseActionTypes.LoadCatalogGenresFailure,
      BrowseActionTypes.LoadCatalogGenreFailure
      ),
    map(() => new appActions.AppShowToast({type: 'danger'}))
  )

  

}
