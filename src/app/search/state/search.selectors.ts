import { SearchState } from './search.reducer';
import { State } from '../../state/index';
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

export const selectSearchLibraryAlbums = createSelector(
  selectSearchState,
  (state: SearchState) => state.libraryAlbums
)

export const selectSearchLibraryPlaylists = createSelector(
  selectSearchState,
  (state: SearchState) => state.libraryPlaylists
)

export const selectSearchLibraryArtists = createSelector(
  selectSearchState,
  (state: SearchState) => state.libraryArtists
)

export const selectSearchLibraryTracks = createSelector(
  selectSearchState,
  (state: SearchState) => state.libraryTracks
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

export const selectLibrarySearchResults = createSelector(
  selectSearchLibraryAlbums,
  selectSearchLibraryPlaylists,
  selectSearchLibraryArtists,
  selectSearchLibraryTracks,
  (libAlbums, libPlaylists, libArtists, libTracks) => {
    return {libAlbums, libPlaylists, libArtists, libTracks}
  }
)
