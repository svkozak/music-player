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
  player: PlayerState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  albums: albumReducer,
  playlists: playlistReducer,
  player: playerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
