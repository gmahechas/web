import { EntityActionTypes, EntityActions } from '@web/app/features/c/type-person-identification/store/actions/entity-type-person-identification.actions';

export interface State {
  error: string;
  pending: boolean;
}

export const initialState: State = {
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {
    case EntityActionTypes.LoadFailEntity:
    case EntityActionTypes.StoreFailEntity:
    case EntityActionTypes.UpdateFailEntity:
    case EntityActionTypes.DestroyFailEntity: {
      return {
        ...state,
        error: action.payload.error,
        pending: true
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

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
