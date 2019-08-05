import { State } from './../reducers/index';
import { AppState } from './../reducers/app.reducer';
import { createSelector } from '@ngrx/store';


export const selectAppState = (state: State) => state.app

export const selectIsLoggedIn = createSelector(
  selectAppState,
  (state: AppState) => state.isLoggedIn
)