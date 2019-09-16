import { PlaylistsState } from './playlist.reducer';
import { State } from '../../state/index';
import { createSelector } from '@ngrx/store';


export const selectPlaylistsState = (state: State) => state.playlists

export const selectIsLoadingPlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.isLoading
)

export const selectPlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.playlists
)

export const selectSelectedPlaylist = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.selectedPlaylist
)
