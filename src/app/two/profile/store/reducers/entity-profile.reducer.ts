import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from './../../models/profile.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-profile.actions';

export interface State extends EntityState<Profile> {

}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (entity: Profile) => entity.profile_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationProfile.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeProfile, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateProfile.profile_id,
        changes: action.payload.updateProfile
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyProfile.profile_id, state);
    }

    default:
      return state;
  }

}