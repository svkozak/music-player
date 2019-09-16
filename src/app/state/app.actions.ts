import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppCheckAuthorization = '[App] Check authorization',
  AppCheckAuthorizationSuccess = '[App] Check authorization success',
  AppCheckAuthorizationFailure = '[App] Check authorization failure',
  AppLogIn = '[App] Log in',
  AppLogInSuccess = '[App] Log in success',
  AppLogInFailure = '[App] Log in failure',
  AppLogOut = '[App] Log out',
  AppLogOutSuccess = '[App] Log out success',
  AppLogOutFailure = '[App] Log out failure',
  AppShowToast = '[App] Show toast message',
  AppDismissToast = '[App] Dismiss toast message'
}

export class AppCheckAuthorization implements Action {
  readonly type = AppActionTypes.AppCheckAuthorization;
}

export class AppCheckAuthorizationSuccess implements Action {
  readonly type = AppActionTypes.AppCheckAuthorizationSuccess;
  constructor(public payload: {isLoggedIn: boolean}) {}
}

export class AppCheckAuthorizationFailure implements Action {
  readonly type = AppActionTypes.AppCheckAuthorizationFailure;
  constructor(public payload: {error: any}) {}
}

export class AppLogIn implements Action {
  readonly type = AppActionTypes.AppLogIn;
}

export class AppLogInSuccess implements Action {
  readonly type = AppActionTypes.AppLogInSuccess;
  constructor(public payload: { isLoggedIn: boolean }) { }
}

export class AppLogInFailure implements Action {
  readonly type = AppActionTypes.AppLogInFailure;
  constructor(public payload: { error: any }) { }
}

export class AppLogOut implements Action {
  readonly type = AppActionTypes.AppLogOut;
}

export class AppLogOutSuccess implements Action {
  readonly type = AppActionTypes.AppLogOutSuccess;
  constructor(public payload: { isLoggedIn: boolean }) { }
}

export class AppLogOutFailure implements Action {
  readonly type = AppActionTypes.AppLogOutFailure;
  constructor(public payload: { error: any }) { }
}

// add errors, etc
export class AppShowToast implements Action {
  readonly type = AppActionTypes.AppShowToast;
  constructor(public payload?: { type: any }) { }
}

export class AppDismissToast implements Action {
  readonly type = AppActionTypes.AppDismissToast;
}


export type AppActions =
AppCheckAuthorization |
AppCheckAuthorizationSuccess |
AppCheckAuthorizationFailure |
AppLogIn |
AppLogInSuccess |
AppLogInFailure |
AppLogOut | 
AppLogOutSuccess |
AppLogOutFailure |
AppShowToast |
AppDismissToast
;

