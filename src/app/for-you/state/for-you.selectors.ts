import { ForYouState } from './for-you.reducer';
import { State } from '../../state/index';
import { createSelector } from '@ngrx/store';


export const selectForYouState = (state: State) => state.forYou

export const selectIsForYouLoading = createSelector(
  selectForYouState,
  (state: ForYouState) => state.isLoading
)

export const selectRecommendations = createSelector(
  selectForYouState,
  (state: ForYouState) => state.recommendations
)