import { selectIsLoadingPlaylists } from './../browse/state/playlist.selector';
import { State } from './index';
import { AppState } from './app.reducer';
import { createSelector } from '@ngrx/store';
import { selectIsBrowseLoading } from '../browse/state/browse.selectors';
import { selectIsLibraryLoading } from '../library/state/library.selectors';
import { selectIsLoading } from '../browse/state/album.selectors';
import { selectIsForYouLoading } from '../for-you/state/for-you.selectors';


export const selectAppState = (state: State) => state.app;

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

export const selectGlobalLoading = createSelector(
  selectIsBrowseLoading,
  selectIsLibraryLoading,
  selectIsLoading,
  selectIsLoadingPlaylists,
  selectIsForYouLoading,
  (val1, val2, val3, val4, val5) => {
    return val1 || val2 || val3 || val4 || val5;
  }
)




