import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/d/project/store/reducers/entity-project.reducer';
import * as fromSearch from '@web/app/features/d/project/store/reducers/search-project.reducer';
import * as fromPagination from '@web/app/features/d/project/store/reducers/pagination-project.reducer';
import * as fromLayout from '@web/app/features/d/project/store/reducers/layout-project.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProjectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  project: ProjectState;
}

export function reducers(state: ProjectState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getProjectState = createFeatureSelector<State, ProjectState>('project');
