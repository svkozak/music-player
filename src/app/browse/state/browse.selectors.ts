import { activities } from './../../state/app.constants';
import { BrowseState } from './browse.reducer';
import { State } from '../../state/reducers/index';
import { createSelector } from '@ngrx/store';


export const selectBrowseState = (state: State) => state.browse

export const selectIsBrowseLoading = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.isLoading
)

export const selectSelectedCatalogArtist = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.selectedArtist
)

export const selectSelectedActivity = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.selectedActivity
)

export const selectActivities = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.activities
)

export const selectActivityPlaylists = createSelector(
  selectBrowseState,
  (state: BrowseState) => state.activityPlaylists
)
