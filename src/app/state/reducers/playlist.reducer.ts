import { PlaylistsActionTypes, PlaylistsActions, LoadPlaylistsFailure } from './../actions/playlists.actions';


export interface PlaylistsState {
  isLoading: boolean;
  error?: any,
  playlists?: any,
  selectedPlaylist?: any
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
      const { playlists } = action.payload
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
      
    default:
      return state;
  }
}
