import { AuthActions, AuthActionTypes } from '@app/app/auth/store/actions/auth.actions';

export interface State {
  loggedIn: boolean;
}

export const initialState: State = {
  loggedIn: false
};

export function reducer(state = initialState, action: AuthActions): State {

  switch (action.type) {

    case AuthActionTypes.Login: {
      return state;
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case AuthActionTypes.Logout: {
      return {
        ...state,
        loggedIn: false
      };
    }

    default:
      return state;
  }

}

export const getLoggedIn = (state: State) => state.loggedIn;
