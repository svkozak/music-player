import { Album } from '../../models/album.model';
import { AlbumActionTypes, AlbumActions } from './album.actions';


export interface AlbumsState {
  isLoading: boolean;
  error?: any,
  albums?: Album[],
  selectedAlbum?: Album
}

export const initialState: AlbumsState = {
  isLoading: false,
  error: null,
  albums: [],
  selectedAlbum: null
};

export function albumReducer(state: AlbumsState = initialState, action: AlbumActions): AlbumsState {
  
  switch (action.type) {

    case AlbumActionTypes.LoadAlbums: {
      return {
        ...state,
        isLoading: true,
      }
    } 
      
    case AlbumActionTypes.LoadAlbumsSuccess: {
      const { albums } = action.payload
      return {
        ...state,
        isLoading: false,
        albums: albums
      }
    }
    
    case AlbumActionTypes.LoadAlbumsFailure: {
      const { error } = action.payload
      return {
        ...state,
        isLoading: false,
        error
      }
    }

    case AlbumActionTypes.LoadAlbum: {
      const { id } = action.payload
      return {
        ...state,
        isLoading: true,
        selectedAlbum: { id: id }
      }
    } 
      
    case AlbumActionTypes.LoadAlbumSuccess: {
      const { album } = action.payload
      return {
        ...state,
        isLoading: false,
        selectedAlbum: album
      }
    }
    
    case AlbumActionTypes.LoadAlbumFailure: {
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
