import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/c/profile/containers';
import { ProfileExistGuard } from '@web/app/features/c/profile/guards/profile-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageProfileComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageProfileComponent },
      {
        path: ':profile_id', component: fromContainers.FormPageProfileComponent, canActivate: [ProfileExistGuard], children: [
          {
            path: 'profile-menu',
            loadChildren: () => {
              return import('@web/app/features/c/profile-menu/profile-menu.module').then(m => m.ProfileMenuModule);
            },
            outlet: 'router-outlet-profile-menu'
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
export class ProfileRoutingModule { }
