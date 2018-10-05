import { EntityMacroprojectEffects } from '@web/app/three/macroproject/store/effects/entity-macroproject.effects';
import { LayoutMacroprojectEffects } from '@web/app/three/macroproject/store/effects/layout-macroproject.effects';

export const effects: any[] = [
    EntityMacroprojectEffects,
    LayoutMacroprojectEffects
];

export * from '@web/app/three/macroproject/store/effects/entity-macroproject.effects';
export * from '@web/app/three/macroproject/store/effects/layout-macroproject.effects';
