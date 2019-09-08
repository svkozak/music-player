import { State } from './../reducers/index';
import { AppState } from './../reducers/app.reducer';
import { createSelector } from '@ngrx/store';


export const selectAppState = (state: State) => state.app

export const selectIsLoggedIn = createSelector(
  selectAppState,
  (state: AppState) => state.isLoggedIn
)

export const selectShowToast = createSelector(
  selectAppState,
  (state: AppState) => state.showToast
)

export const selectShowToastType = createSelector(
  selectAppState,
  (state: AppState) => state.toastType
)

export const selectToastOptiions = createSelector(
  selectShowToast,
  selectShowToastType,
  (show, type) => {
    return {show, type}
  }
)


