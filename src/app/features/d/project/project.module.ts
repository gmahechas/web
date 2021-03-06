import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/d/project/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ProjectRoutingModule } from '@web/app/features/d/project/project-routing.module';
import { MacroprojectModule } from '@web/app/features/d/macroproject/macroproject.module';

import * as fromContainers from '@web/app/features/d/project/containers';
import * as fromComponents from '@web/app/features/d/project/components';
import * as fromShared from '@web/app/features/d/project/shared';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    StoreModule.forFeature('project', reducers),
    EffectsModule.forFeature(effects),
    MacroprojectModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class ProjectModule { }
