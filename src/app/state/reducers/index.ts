import { libraryReducer, LibraryState } from './library.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AppState, appReducer } from './app.reducer';
import { environment } from '../../../environments/environment';
import { albumReducer, AlbumsState } from './album.reducer';
import { playlistReducer, PlaylistsState } from './playlist.reducer';
import { PlayerState, playerReducer } from './player.reducer';

export interface State {
  app: AppState,
  albums: AlbumsState,
  playlists: PlaylistsState,
  library: LibraryState,
  player: PlayerState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  library: libraryReducer,
  albums: albumReducer,
  playlists: playlistReducer,
  player: playerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
