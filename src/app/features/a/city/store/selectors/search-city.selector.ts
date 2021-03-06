import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/a/city/store/reducers';
import * as fromSearch from '@web/app/features/a/city/store/reducers/search-city.reducer';

export const getSearchState = createSelector(
    fromFeature.getCityState,
    (state: fromFeature.CityState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
