import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/two/user-office/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { UserOfficeRoutingModule } from '@app/app/two/user-office/user-office-routing.module';

import * as fromContainers from '@app/app/two/user-office/containers';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeRoutingModule,
    StoreModule.forFeature('user_office', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class UserOfficeModule { }
