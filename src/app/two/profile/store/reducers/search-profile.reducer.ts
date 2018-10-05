import { EntityActionTypes, EntityActions } from '@app/app/two/profile/store/actions/entity-profile.actions';
import { SearchProfile } from '@app/app/two/profile/models/search-profile.model';

export interface State {
  loaded: boolean;
  query: SearchProfile;
}

export const initialState: State = {
  loaded: false,
  query: {
    profile: {
      profile_id: '',
      profile_name: ''
    }
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: {
          profile: action.payload.search.profile
        }
      };
    }

    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
        loaded: true
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return {
        ...state,
        loaded: false
      };
    }

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
