import { BrowseActions, BrowseActionTypes } from './browse.actions';
import { Artist } from './../../models/artist.model';
import { Playlist } from './../../models/playlist.model';
import { Album } from '../../models/album.model';


export interface BrowseState {
  isLoading: boolean;
  error?: any,
  selectedArtist?: Artist;
  albums?: Album[],
  playlists?: Playlist[],
  selectedAlbum?: Album,
  selectedPlaylist?: Playlist
}

export const initialState: BrowseState = {
  isLoading: false,
  error: null,
  selectedArtist: null,
  albums: [],
  playlists: [],
  selectedAlbum: null,
  selectedPlaylist: null
};

export function browseReducer(state: BrowseState = initialState, action: BrowseActions): BrowseState {
  
  switch (action.type) {

    case BrowseActionTypes.LoadCatalogArtist: {
      const { id } = action.payload
      return {
        ...state,
        isLoading: true,
        selectedArtist: {id: id}
      }
    } 
      
    case BrowseActionTypes.LoadCatalogArtistSuccess: {
      const { artist } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedArtist: artist
      }
    }
    
    case BrowseActionTypes.LoadCatalogArtistFailure: {
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
