import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import * as fromCore from '@web/app/core/store';

import { Department } from '@web/app/features/b/department/models/department.model';
import { SearchDepartment } from '@web/app/features/b/department/models/search-department.model';
import { SelectedDepartment, initialStateSelectedDepartment } from '@web/app/features/b/department/models/selected-department.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-department',
  templateUrl: './index-page-department.component.html',
  styles: []
})
export class IndexPageDepartmentComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Department;

  query$ = this.store.pipe(select(fromDepartment.getQuery));

  data$ = this.store.pipe(select(fromDepartment.getAllEntities));
  total$ = this.store.pipe(select(fromDepartment.getTotal));
  perPage$ = this.store.pipe(select(fromDepartment.getPerPage));
  from$ = this.store.pipe(select(fromDepartment.getFrom));
  to$ = this.store.pipe(select(fromDepartment.getTo));
  configTable: any;

  constructor(
    private store: Store<fromDepartment.State>
  ) {
    this.configTable = {
      dataKey: 'department_id',
      cols: [
        { fields: ['department_id'], header: ['department.model.department_id'], style: { width: '5%' } },
        { fields: ['department_name'], header: ['department.model.department_name'], style: { width: '30%' } },
        { fields: ['department_description'], header: ['department.model.department_description'], style: { width: '65%' } }
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromDepartment.getSelected), take(1)).subscribe(
      (selected: SelectedDepartment) => {

        if (selected.gotoOfficeDepartment && selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['department', selected.selectedEntity.department_id, {
              outlets: { 'router-outlet-user-department': ['office-department', 'department', selected.selectedEntity.department_id] }
            }]
          }));
        } else if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(fromCore.RouterActions.Go({
            path: ['department', selected.selectedEntity.department_id]
          }));
        }
      }
    );
  }

  onLoad(departmentSearch: SearchDepartment) {
    this.store.dispatch(fromDepartment.EntityActions.LoadEntity({
      search: {
        ...departmentSearch,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(fromDepartment.EntityActions.SetSelected({ selected: initialStateSelectedDepartment }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['department', 'create']
    }));
  }

  onEdit(department: Department) {
    this.store.dispatch(fromDepartment.EntityActions.SetSelected({ selected: { selectedEntity: department } }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['department', department.department_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(fromDepartment.EntityActions.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(fromDepartment.EntityActions.SetSelected({ selected: initialStateSelectedDepartment }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['department']
    }));
  }

  onResetSearch() {
    this.store.dispatch(fromDepartment.EntityActions.Reset({ redirect: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
