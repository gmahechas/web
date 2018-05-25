import { EntityActionTypes, EntityActions } from '../actions/entity-country.actions';

export interface State {
  total: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

const initialState: State = {
  total: null,
  perPage: null,
  currentPage: null,
  from: null,
  to: null
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.EntityLoadSuccess: {
      return {
        ...state,
        total: action.payload.paginationCountry.total,
        perPage: action.payload.paginationCountry.per_page,
        currentPage: action.payload.paginationCountry.current_page,
        from: action.payload.paginationCountry.from,
        to: action.payload.paginationCountry.to
      };
    }

    case EntityActionTypes.EntityLoadFail: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }

}

export const getTotal = (state: State) => state.total;
export const getPerPage = (state: State) => state.perPage;
export const getCurrentPage = (state: State) => state.currentPage;
export const getFrom = (state: State) => state.from;
export const getTo = (state: State) => state.to;
