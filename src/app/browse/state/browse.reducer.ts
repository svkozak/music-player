import { activities } from './../../state/app.constants';
import { Activity } from './../../models/activity.model';
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
  selectedPlaylist?: Playlist,
  activities?: Activity[]
}

export const initialState: BrowseState = {
  isLoading: false,
  error: null,
  selectedArtist: null,
  albums: [],
  playlists: [],
  selectedAlbum: null,
  selectedPlaylist: null,
  activities: []
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

    case BrowseActionTypes.LoadActivities: {
      return {
        ...state,
        isLoading: true
      }
    } 
      
    case BrowseActionTypes.LoadActivitiesSuccess: {
      const { activities } = action.payload
      return {
        ...state,
        isLoading: false,
        activities: activities
      }
    }
    
    case BrowseActionTypes.LoadActivitiesFailure: {
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
