import { ForYouActions, ForYouActionTypes } from './for-you.actions';
import { Playlist } from 'src/app/models/playlist.model';
import { Album } from './../../models/album.model';
import { Recommendation } from 'src/app/models/recommendation.models';


export interface ForYouState {
  isLoading?: boolean;
  error?: any,
  recommendations?: Recommendation[],
  forYouAlbums?: Album[],
  forYouPlaylists?: Playlist[]
}

export const initialState: ForYouState = {
  isLoading: false,
  error: null,
  recommendations: [],
  forYouAlbums: [],
  forYouPlaylists: []
};

export function forYouReducer(state: ForYouState = initialState, action: ForYouActions): ForYouState {
  
  switch (action.type) {

    case ForYouActionTypes.LoadForYou: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case ForYouActionTypes.LoadForYouSuccess: {
      const { recommendations } = action.payload
      return {
        ...state,
        isLoading: false,
        recommendations: recommendations
      }
    }
    
    case ForYouActionTypes.LoadForYouFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case ForYouActionTypes.LoadRecommendation: {
      return {
        ...state,
        isLoading: true
      }
    }

    case ForYouActionTypes.LoadRecommendationSuccess: {
      const { recommendation } = action.payload
      return {
        ...state,
        isLoading: false,
        recommendations: [...state.recommendations, recommendation]
      }
    }
    
    case ForYouActionTypes.LoadRecommendationFailure: {
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
