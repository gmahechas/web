import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { User } from '@web/app/features/c/user/models/user.model';
import { SearchUser } from '@web/app/features/c/user/models/search-user.model';
import { SelectedUser, initialStateSelectedUser } from '@web/app/features/c/user/models/selected-user.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-user',
  templateUrl: './index-page-user.component.html',
  styles: []
})
export class IndexPageUserComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: User;

  query$ = this.store.pipe(select(fromUser.getQuery));

  data$ = this.store.pipe(select(fromUser.getAllEntities));
  total$ = this.store.pipe(select(fromUser.getTotal));
  perPage$ = this.store.pipe(select(fromUser.getPerPage));
  from$ = this.store.pipe(select(fromUser.getFrom));
  to$ = this.store.pipe(select(fromUser.getTo));
  configTable: any;

  constructor(
    private store: Store<fromUser.State>
  ) {
    this.configTable = {
      dataKey: 'user_id',
      cols: [
        { fields: ['user_id'], header: ['user.model.user_id'], style: { width: '5%' } },
        { fields: ['username'], header: ['user.model.username'], style: { width: '20%' } },
        { fields: ['profile.profile_name'], header: ['profile.singular'], style: { width: '25%' } },
        {
          fields: [
            'person.person_first_name',
            'person.person_second_name',
            'person.person_first_surname',
            'person.person_second_surname',
            'person.person_legal_name'
          ],
          header: ['person.singular'], style: { width: '50%' }
        },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromUser.getSelected), take(1)).subscribe(
      (selected: SelectedUser) => {

        if (selected.gotoUserOffice && selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: [
              'user',
              selected.selectedEntity.user_id,
              { outlets: { 'router-outlet-user-office': ['user-office', 'user', selected.selectedEntity.user_id] } }
            ]
          }));
        } else if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['user', selected.selectedEntity.user_id]
          }));
        }
      }
    );
  }

  onLoad(userSearch: SearchUser) {
    this.store.dispatch(fromUser.EntityActions.LoadEntity({
      search: {
        ...userSearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromUser.EntityActions.SetSelected({ selected: initialStateSelectedUser }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['user', 'create']
    }));
  }

  onEdit(user: User) {
    this.store.dispatch(fromUser.EntityActions.SetSelected({ selected: { selectedEntity: user } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['user', user.user_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromUser.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromUser.EntityActions.SetSelected({ selected: initialStateSelectedUser }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['user']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromUser.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
