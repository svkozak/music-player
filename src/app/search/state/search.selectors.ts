import { SearchState } from './search.reducer';
import { State } from '../../state/reducers/index';
import { createSelector } from '@ngrx/store';


export const selectSearchState = (state: State) => state.search

export const selectIsSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.isLoading
)

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.searchResults
)