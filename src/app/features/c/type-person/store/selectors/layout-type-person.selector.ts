import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/type-person/store/reducers';
import * as fromLayout from '@web/app/features/c/type-person/store/reducers/layout-type-person.reducer';

export const getLayoutState = createSelector(
  fromFeature.getTypePersonState,
  (state: fromFeature.TypePersonState) => state.layout
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
