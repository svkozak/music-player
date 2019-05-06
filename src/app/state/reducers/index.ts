import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { albumReducer, AlbumsState } from './album.reducer';
import { playlistReducer, PlaylistsState } from './playlist.reducer';

export interface State {
  albums: AlbumsState,
  playlists: PlaylistsState
}

export const reducers: ActionReducerMap<State> = {
  albums: albumReducer,
  playlists: playlistReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
