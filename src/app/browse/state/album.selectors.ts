import { State } from '../../state/index';
import { AlbumsState } from './album.reducer';
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

export const selectAlbumRelationships = createSelector(
  selectAlbumState,
  (state: AlbumsState) => state.selectedAlbum.relationships
)

