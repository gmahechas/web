import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/two/profile/store/reducers/entity-profile.reducer';
import * as fromSearch from '@web/app/two/profile/store/reducers/search-profile.reducer';
import * as fromPagination from '@web/app/two/profile/store/reducers/pagination-profile.reducer';
import * as fromLayout from '@web/app/two/profile/store/reducers/layout-profile.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProfileState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<ProfileState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  profile: ProfileState;
}

export const getProfileState = createFeatureSelector<State, ProfileState>('profile');
