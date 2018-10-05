import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/two/user-office/store/reducers';
import * as fromEntity from '@web/app/two/user-office/store/reducers/entity-user-office.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getUserOfficeState,
  (state: fromFeature.UserOfficeState) => state.entity
);

export const {
  selectIds: getIds, // 1,2,3...
  selectEntities: getEntities, // Key with Entities
  selectAll: getAllEntities, // Entities
  selectTotal: getTotalEntities, // total
} = fromEntity.adapter.getSelectors(getEntityState);
