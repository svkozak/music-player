import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { SearchActionTypes } from './search.actions';
import * as searchActions from '../state/search.actions';



@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  searchCatalog$ = this.actions$.pipe(
    ofType<searchActions.SearchCatalog>(SearchActionTypes.SearchCatalog),
    map(action => action.payload),
    mergeMap(payload => this.api.searchCatalog(payload.term)
    .pipe(
        map(results => new searchActions.SearchCatalogSuccess({searchResults: results})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  searchLibrary$ = this.actions$.pipe(
    ofType<searchActions.SearchLibrary>(SearchActionTypes.SearchLibrary),
    map(action => action.payload),
    mergeMap(payload => this.api.searchLibrary(payload.term)
    .pipe(
        map(results => new searchActions.SearchLibrarySuccess({searchResults: results})),
        catchError(() => EMPTY)
    ))
  )
  



}
