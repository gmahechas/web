import { EntityActionTypes, EntityActions } from '@web/app/features/d/project/store/actions/entity-project.actions';
import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

export interface State {
  loaded: boolean;
  query: SearchProject;
}

export const initialState: State = {
  loaded: false,
  query: {
    project: {
      project_id: '',
      project_name: ''
    },
    macroproject: null
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: { ...state.query, ...action.payload.search }
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
