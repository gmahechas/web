import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';

export interface SelectedTypePersonIdentification {
  selectedEntity?: TypePersonIdentification | null;
}

export const initialStateSelectedTypePersonIdentification: SelectedTypePersonIdentification = {
  selectedEntity: null
};
