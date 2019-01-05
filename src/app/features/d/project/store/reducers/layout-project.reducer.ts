import { EntityActionTypes, EntityActions } from '@web/app/features/d/project/store/actions/entity-project.actions';
import { Project } from '@web/app/features/d/project/models/project.model';

export interface State {
  selected: {
    selectedEntity: Project | null;
  };
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: {
    selectedEntity: null
  },
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selected: { selectedEntity: action.payload.entity }
      };
    }

    case EntityActionTypes.LoadFailEntity:
    case EntityActionTypes.StoreFailEntity:
    case EntityActionTypes.UpdateFailEntity:
    case EntityActionTypes.DestroyFailEntity: {
      return {
        ...state,
        error: action.payload.error,
        pending: false
      };
    }

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.PaginateEntity:
    case EntityActionTypes.StoreEntity:
    case EntityActionTypes.UpdateEntity:
    case EntityActionTypes.DestroyEntity: {
      return {
        ...state,
        pending: true
      };
    }

    case EntityActionTypes.LoadSuccessEntity:
    case EntityActionTypes.StoreSuccessEntity:
    case EntityActionTypes.UpdateSuccessEntity:
    case EntityActionTypes.DestroySuccessEntity: {
      return {
        ...state,
        pending: false
      };
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
