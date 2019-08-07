import { LibraryActions, LibraryActionTypes } from './../actions/library.actions';
import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';


export interface LibraryState {
  isLoading: boolean;
  error?: any,
  albums?: Album[],
  selectedAlbum?: Album,
  playlists?: Playlist[],
  selectedPlaylist?: Playlist
}

export const initialState: LibraryState = {
  isLoading: false,
  error: null,
  albums: null,
  selectedAlbum: null,
  playlists: null,
  selectedPlaylist: null
};

export function libraryReducer(state: LibraryState = initialState, action: LibraryActions): LibraryState {
  
  switch (action.type) {

    case LibraryActionTypes.LoadLibraryAlbums: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.LoadLibraryAlbumsSuccess: {
      const { albums } = action.payload
      return {
        ...state,
        isLoading: false,
        albums: albums
      }
    }
    
    case LibraryActionTypes.LoadLibraryAlbumsFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case LibraryActionTypes.LoadLibraryAlbum: {
      const { id } = action.payload
      return {
        ...state,
        isLoading: true,
        selectedAlbum: { id: id }
      }
    } 
      
    case LibraryActionTypes.LoadLibraryAlbumSuccess: {
      const { album } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedAlbum: album
      }
    }
    
    case LibraryActionTypes.LoadLibraryAlbumFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    // playlists

    case LibraryActionTypes.LoadLibraryPlaylists: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.LoadLibraryPlaylistsSuccess: {
      const { playlists } = action.payload
      return {
        ...state,
        isLoading: false,
        playlists: playlists
      }
    }
    
    case LibraryActionTypes.LoadLibraryPlaylistsFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case LibraryActionTypes.LoadLibraryPlaylist: {
      const { id } = action.payload
      return {
        ...state,
        isLoading: true,
        selectedPlaylist: { id: id }
      }
    } 
      
    case LibraryActionTypes.LoadLibraryPlaylistSuccess: {
      const { playlist } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedPlaylist: playlist
      }
    }
    
    case LibraryActionTypes.LoadLibraryPlaylistFailure: {
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
