import * as forYouActions from './for-you.actions';
import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from '../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { ForYouActionTypes } from '../state/for-you.actions';
import * as appActions from '../../state/app.actions';


@Injectable()
export class ForYouEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  @Effect()
  loadForYouItems$ = this.actions$.pipe(
    ofType(ForYouActionTypes.LoadForYou),
    mergeMap(() => this.api.getRecommendations()
    .pipe(
        map(results => new forYouActions.LoadForYouSuccess({recommendations: results.reverse()})),
        catchError(error => of(new forYouActions.LoadForYouFailure({error : error})))
    ))
  )

  @Effect()
  loadRecommendation$ = this.actions$.pipe(
    ofType<forYouActions.LoadRecommendation>(ForYouActionTypes.LoadRecommendation),
    map(action => action.payload),
    mergeMap(payload => this.api.getRecommendation(payload.id, payload.offset).pipe(
      map(recommendation => new forYouActions.LoadRecommendationSuccess({recommendation: recommendation})),
      catchError(error => of(new forYouActions.LoadRecommendationFailure({error : error})))
    ))
  )

  @Effect()
  forYouErrorToast$ = this.actions$.pipe(
    ofType(
      ForYouActionTypes.LoadForYouFailure, 
      ForYouActionTypes.LoadRecommendationFailure
      ),
    map(() => new appActions.AppShowToast({type: 'danger'}))
  )
  



}
