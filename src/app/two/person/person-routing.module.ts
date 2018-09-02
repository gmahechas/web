import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { PersonExistGuard } from './guards/person-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPagePersonComponent,
    children: [
      { path: 'create', component: fromContainers.FormPagePersonComponent },
      { path: ':person_id', component: fromContainers.FormPagePersonComponent, canActivate: [PersonExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule { }