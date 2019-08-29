import { SearchActions, SearchActionTypes } from './search.actions';
import { Artist } from './../../models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';
import { Album } from './../../models/album.model';
import { Track } from 'src/app/models/track.model';


export interface SearchState {
  isLoading?: boolean;
  error?: any,
  searchResults?: any,
  albums?: Album[],
  playlists?: Playlist[],
  tracks?: Track[],
  artists?: Artist[]
}

export const initialState: SearchState = {
  isLoading: false,
  error: null,
  searchResults: [],
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
        searchResults
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

      
    default:
      return state;
  }
}
