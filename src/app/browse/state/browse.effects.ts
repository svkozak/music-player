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

  

}
