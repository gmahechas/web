import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/b/office/store/reducers/entity-office.reducer';
import * as fromSearch from '@web/app/features/b/office/store/reducers/search-office.reducer';
import * as fromPagination from '@web/app/features/b/office/store/reducers/pagination-office.reducer';
import * as fromLayout from '@web/app/features/b/office/store/reducers/layout-office.reducer';
import * as fromCore from '@web/app/core/store';

export interface OfficeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  office: OfficeState;
}

export function reducers(state: OfficeState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getOfficeState = createFeatureSelector<State, OfficeState>('office');
