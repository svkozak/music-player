import { AppActionTypes, AppActions } from './app.actions';
import { Album } from './../models/album.model';


export interface AppState {
  isLoggedIn: boolean;
  showToast?: boolean;
  toastType?: string;
  error?: any;
}

export const initialState: AppState = {
  isLoggedIn: false,
  showToast: false,
  toastType: '',
  error: null
};

export function appReducer(state: AppState = initialState, action: AppActions): AppState {
  
  switch (action.type) {

    case AppActionTypes.AppCheckAuthorization: {
      return {
        ...state
      }
    }

    case AppActionTypes.AppCheckAuthorizationSuccess: {
      const { isLoggedIn } = action.payload
      return {
        ...state,
        isLoggedIn: isLoggedIn
      }
    }

    case AppActionTypes.AppLogIn: {
      return {
        ...state
      }
    }

    case AppActionTypes.AppLogInSuccess: {
      const { isLoggedIn } = action.payload
      return {
        ...state,
        isLoggedIn: isLoggedIn
      }
    }

    case AppActionTypes.AppLogInFailure: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }

    case AppActionTypes.AppLogOut: {
      return {
        ...state
      }
    }

    case AppActionTypes.AppLogOutSuccess: {
      const { isLoggedIn } = action.payload
      return {
        ...state,
        isLoggedIn: isLoggedIn
      }
    }

    case AppActionTypes.AppLogOutFailure: {
      const { error } = action.payload
      return {
        ...state,
        error: error
      }
    }

    case AppActionTypes.AppShowToast: {
      const { payload } = action;
      return {
        ...state,
        showToast: true,
        toastType: payload.type
      }
    }

    case AppActionTypes.AppDismissToast: {
      return {
        ...state,
        showToast: false,
        toastType: ''
      }
    }
      
    default:
      return state;
  }
}
