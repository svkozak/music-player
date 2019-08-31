import { SearchState } from './search.reducer';
import { State } from '../../state/reducers/index';
import { createSelector } from '@ngrx/store';


export const selectSearchState = (state: State) => state.search

export const selectIsSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.isLoading
)

export const selectSearchAlbums = createSelector(
  selectSearchState,
  (state: SearchState) => state.albums
)

export const selectSearchPlaylists = createSelector(
  selectSearchState,
  (state: SearchState) => state.playlists
)

export const selectSearchArtists = createSelector(
  selectSearchState,
  (state: SearchState) => state.artists
)

export const selectSearchTracks = createSelector(
  selectSearchState,
  (state: SearchState) => state.tracks
)

export const selectSearchResults = createSelector(
  selectSearchAlbums,
  selectSearchPlaylists,
  selectSearchArtists,
  selectSearchTracks,
  (albums, playlists, artists, tracks) => {
    return {albums, playlists, artists, tracks}
  }
)