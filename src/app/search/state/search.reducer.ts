import { SearchActions, SearchActionTypes } from './search.actions';
import { Artist } from './../../models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';
import { Album } from './../../models/album.model';
import { Track } from 'src/app/models/track.model';


export interface SearchState {
  isLoading?: boolean;
  error?: any,
  albums?: Album[],
  playlists?: Playlist[],
  tracks?: Track[],
  artists?: Artist[]
}

export const initialState: SearchState = {
  isLoading: false,
  error: null,
  albums: [],
  playlists: [],
  artists: [],
  tracks: []
};

export function searchReducer(state: SearchState = initialState, action: SearchActions): SearchState {
  
  switch (action.type) {

    case SearchActionTypes.SearchCatalog: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case SearchActionTypes.SearchCatalogSuccess: {
      const { searchResults } = action.payload
      return {
        ...state,
        isLoading: false,
        albums: searchResults.albums ? [...state.albums, ...searchResults.albums.data] : state.albums,
        playlists: searchResults.playlists ? [...state.playlists, ...searchResults.playlists.data] : state.playlists,
        artists: searchResults.artists ? [...state.artists, ...searchResults.artists.data] : state.artists,
        tracks: searchResults.songs? [...state.tracks, ...searchResults.songs.data] : state.tracks
      }
    }
    
    case SearchActionTypes.SearchCatalogFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case SearchActionTypes.SearchClear: {
      return {
        ...initialState
      }
    }

      
    default:
      return state;
  }
}
