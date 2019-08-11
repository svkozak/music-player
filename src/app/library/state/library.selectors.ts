import { State } from '../../state/reducers/index';
import { createSelector } from '@ngrx/store';
import { LibraryState } from './library.reducer';


export const selectLibraryState = (state: State) => state.library

export const selectIsLibraryLoading = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.isLoading
)

export const selectLibraryAlbums = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.albums
)

export const selectSelectedLibraryAlbum = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.selectedAlbum
)

export const selectLibraryPlaylists = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.playlists
)

export const selectSelectedLibraryPlaylist = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.selectedPlaylist
)

export const selectRecentlyAddedItems = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.recentlyAddedItems
)

export const selectLibraryArtists = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.artists
)

export const selectSelectedLibraryArtist = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.selectedArtist
)

