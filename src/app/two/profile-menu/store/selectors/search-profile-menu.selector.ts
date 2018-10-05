import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/profile-menu/store/reducers';
import * as fromSearch from '@app/app/two/profile-menu/store/reducers/search-profile-menu.reducer';

export const getSearchState = createSelector(
    fromFeature.getProfileMenuState,
    (state: fromFeature.ProfileMenuState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
