import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/c/user/containers';
import { UserExistGuard } from '@web/app/features/c/user/guards/user-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageUserComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageUserComponent },
      {
        path: ':user_id', component: fromContainers.FormPageUserComponent, canActivate: [UserExistGuard], children: [
          {
            path: 'user-office',
            loadChildren: () => {
              return import('@web/app/features/c/user-office/user-office.module').then(m => m.UserOfficeModule);
            },
            outlet: 'router-outlet-user-office'
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
export class UserRoutingModule { }
