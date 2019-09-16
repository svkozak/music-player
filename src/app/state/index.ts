import { SearchState, searchReducer } from '../search/state/search.reducer';
import { BrowseState, browseReducer } from '../browse/state/browse.reducer';
import { ForYouState } from '../for-you/state/for-you.reducer';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AppState, appReducer } from './app.reducer';
import { environment } from '../../environments/environment';
import { albumReducer, AlbumsState } from '../browse/state/album.reducer';
import { playlistReducer, PlaylistsState } from '../browse/state/playlist.reducer';
import { PlayerState, playerReducer } from '../player/state/player.reducer';
import { libraryReducer, LibraryState } from '../library/state/library.reducer';
import { forYouReducer } from 'src/app/for-you/state/for-you.reducer';

export interface State {
  app: AppState,
  forYou: ForYouState,
  browse: BrowseState,
  albums: AlbumsState,
  playlists: PlaylistsState,
  library: LibraryState,
  search: SearchState,
  player: PlayerState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  forYou: forYouReducer,
  browse: browseReducer,
  library: libraryReducer,
  albums: albumReducer,
  playlists: playlistReducer,
  search: searchReducer,
  player: playerReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
