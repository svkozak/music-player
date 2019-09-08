import { Artist } from './../../models/artist.model';
import { LibraryActions, LibraryActionTypes, AddToPlaylistFailure } from './library.actions';
import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';


export interface LibraryState {
  isLoading: boolean;
  error?: any,
  albums?: Album[],
  selectedAlbum?: Album,
  playlists?: Playlist[],
  selectedPlaylist?: Playlist,
  recentlyAddedItems?: any;
  artists?: Artist[],
  selectedArtist?: Artist
}

export const initialState: LibraryState = {
  isLoading: false,
  error: null,
  albums: [],
  selectedAlbum: null,
  playlists: [],
  selectedPlaylist: null,
  recentlyAddedItems: [],
  artists: [],
  selectedArtist: null
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
        albums: [...state.albums, ...albums]
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
        playlists: [...state.playlists, ...playlists]
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

    // recently added

    case LibraryActionTypes.LoadRecentlyAdded: {
      return {
        ...state,
        isLoading: true
      }
    }

    case LibraryActionTypes.LoadMoreRecentlyAdded: {
      return {
        ...state,
        isLoading: true
      }
    }

    case LibraryActionTypes.LoadRecentlyAddedSuccess: {
      const { recentlyAddedItems } = action.payload
      return {
        ...state,
        isLoading: false,
        recentlyAddedItems: [...state.recentlyAddedItems, ...recentlyAddedItems]
      }
    }

    case LibraryActionTypes.LoadRecentlyAddedFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error: error
      }
    }

    // artists

    case LibraryActionTypes.LoadLibraryArtists: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.LoadLibraryArtistsSuccess: {
      const { artists } = action.payload
      return {
        ...state,
        isLoading: false,
        artists: [...state.artists, ...artists]
      }
    }
    
    case LibraryActionTypes.LoadLibraryArtistsFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case LibraryActionTypes.LoadLibraryArtist: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.LoadLibraryArtistSuccess: {
      const { artist } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedArtist: artist
      }
    }
    
    case LibraryActionTypes.LoadLibraryArtistFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case LibraryActionTypes.AddToLibrary: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.AddToLibrarySuccess: {
      return {
        ...state,
        isLoading: false
      }
    }
    
    case LibraryActionTypes.AddToLibraryFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case LibraryActionTypes.AddToPlaylist: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case LibraryActionTypes.AddToPlaylistSucess: {
      return {
        ...state,
        isLoading: false
      }
    }
    
    case LibraryActionTypes.AddToPlaylistFailure: {
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
