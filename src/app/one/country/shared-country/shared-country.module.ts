import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './../store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './../../../shared/shared.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    StoreModule.forFeature('country', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  declarations: [
    ...fromContainers.containers
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class SharedCountryModule { }