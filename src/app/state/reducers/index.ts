import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { albumReducer, AlbumsState } from './album.reducer';

export interface State {
  albums: AlbumsState
}

export const reducers: ActionReducerMap<State> = {
  albums: albumReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
