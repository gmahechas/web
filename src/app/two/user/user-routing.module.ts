import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { UserExistGuard } from './guards/user-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageUserComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageUserComponent },
      { path: ':user_id', component: fromContainers.FormPageUserComponent, canActivate: [UserExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }