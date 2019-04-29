import { State } from './../reducers/index';
import { AlbumsState } from './../reducers/album.reducer';
import { createSelector } from '@ngrx/store';


export const selectAlbumState = (state: State) => state.albums

export const selectIsLoading = createSelector(
  selectAlbumState,
  (state: AlbumsState) => state.isLoading
)

export const selectAlbums = createSelector(
  selectAlbumState,
  (state: AlbumsState) => state.albums
)

export const selectSelectedAlbum = createSelector(
  selectAlbumState,
  (state: AlbumsState) => state.selectedAlbum
)

export const selectAlbumTracks = createSelector(
  selectAlbumState,
  (state: AlbumsState) => state.selectedAlbum.relationships.tracks
)

