import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/three/macroproject/store/reducers';
import * as fromLayout from '@web/app/three/macroproject/store/reducers/layout-macroproject.reducer';

export const getLayoutState = createSelector(
  fromFeature.getMacroprojectState,
  (state: fromFeature.MacroprojectState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
