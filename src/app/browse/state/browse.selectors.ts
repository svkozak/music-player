import { BrowseState } from './browse.reducer';
import { State } from '../../state/reducers/index';
import { createSelector } from '@ngrx/store';


export const selectBrowseState = (state: State) => state.browse

export const selectIsLoading = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.isLoading
)

export const selectSelectedCatalogArtist = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.selectedArtist
)
