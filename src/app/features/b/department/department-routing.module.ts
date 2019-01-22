import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/b/department/containers';
import { DepartmentExistGuard } from '@web/app/features/b/department/guards/department-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageDepartmentComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageDepartmentComponent },
      {
        path: ':department_id', component: fromContainers.FormPageDepartmentComponent, canActivate: [DepartmentExistGuard], children: [
          {
            path: 'office-department',
            loadChildren: '@web/app/features/b/office-department/office-department.module#OfficeDepartmentModule',
            outlet: 'router-outlet-department'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule { }
