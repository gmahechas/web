import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/a/country/store/reducers';
import * as fromLayout from '@web/app/features/a/country/store/reducers/layout-country.reducer';

export const getLayoutState = createSelector(
  fromFeature.getCountryState,
  (state: fromFeature.CountryState) => state.layout
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
