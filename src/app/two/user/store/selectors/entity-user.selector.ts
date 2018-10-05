import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/user/store/reducers';
import * as fromEntity from '@app/app/two/user/store/reducers/entity-user.reducer';
import * as fromCore from '@app/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.entity
);

export const {
  selectIds: getIds, // 1,2,3...
  selectEntities: getEntities, // Key with Entities
  selectAll: getAllEntities, // Entities
  selectTotal: getTotalEntities, // total
} = fromEntity.adapter.getSelectors(getEntityState);

export const getSelectedByRouter = createSelector(
  getEntities,
  fromCore.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.user_id];
  }
);
