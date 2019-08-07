import { Playlist } from '../../models/playlist.model';
import { PlaylistsActionTypes, PlaylistsActions, LoadPlaylistsFailure } from './playlists.actions';


export interface PlaylistsState {
  isLoading: boolean;
  error?: any,
  playlists?: Playlist[],
  selectedPlaylist?: Playlist
}

export const initialState: PlaylistsState = {
  isLoading: false,
  error: null,
  playlists: null,
  selectedPlaylist: null
};

export function playlistReducer(state: PlaylistsState = initialState, action: PlaylistsActions): PlaylistsState {
  
  switch (action.type) {

    case PlaylistsActionTypes.LoadPlaylists: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case PlaylistsActionTypes.LoadPlaylistsSuccess: {
      const { playlists } = action.payload;
      return {
        ...state,
        isLoading: false,
        playlists: playlists
      }
    }
    
    case PlaylistsActionTypes.LoadPlaylistsFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case PlaylistsActionTypes.LoadPlaylist: {
      const { id } = action.payload
      return {
        ...state,
        isLoading: true,
        selectedPlaylist: {id : id}
      }
    }

    case PlaylistsActionTypes.LoadPlaylistSuccess: {
      const { playlist } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedPlaylist: playlist
      }
    }
    
    case PlaylistsActionTypes.LoadPlaylistFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }
      
    default:
      return state;
  }
}
