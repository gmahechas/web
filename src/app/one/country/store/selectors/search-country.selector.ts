import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSearch from '../reducers/search-country.reducer';

export const getSearchState = createSelector(
    fromFeature.getCountryState,
    (state: fromFeature.CountryState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getError = createSelector(
    getSearchState,
    fromSearch.getError
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
