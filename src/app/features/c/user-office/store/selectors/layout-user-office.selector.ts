import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/user-office/store/reducers';
import * as fromLayout from '@web/app/features/c/user-office/store/reducers/layout-user-office.reducer';

export const getLayoutState = createSelector(
  fromFeature.getUserOfficeState,
  (state: fromFeature.UserOfficeState) => state.layout
);

export const getSelected = createSelector(
  getLayoutState,
  fromLayout.getSelected
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
