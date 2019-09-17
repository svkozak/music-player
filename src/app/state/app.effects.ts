import { MusicKitService } from '../services/music-kit.service';
import { ApiServiceService } from '../services/api-service.service';
import { AppActionTypes } from './app.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import * as appActions from './app.actions';



@Injectable()
export class AppEffects {
  
  constructor(private actions$: Actions, private api: ApiServiceService, private musicKitService: MusicKitService) {}

  @Effect()
  checkLogin$ = this.actions$.pipe(
    ofType(AppActionTypes.AppCheckAuthorization),
    mergeMap(() => this.musicKitService.isUserAuthorized()
      .pipe(
        map(isLoggedIn => {
          return new appActions.AppCheckAuthorizationSuccess({isLoggedIn: isLoggedIn})
        }),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(AppActionTypes.AppLogIn),
    mergeMap(() => this.musicKitService.authorize()
      .pipe(
        map(isLoggedIn => new appActions.AppLogInSuccess({isLoggedIn: isLoggedIn})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(AppActionTypes.AppLogOut),
    mergeMap(() => this.musicKitService.unauthorize()
      .pipe(
        map(isLoggedIn => new appActions.AppLogOutSuccess({isLoggedIn: isLoggedIn})),
        catchError(() => EMPTY)
    ))
  )

}
