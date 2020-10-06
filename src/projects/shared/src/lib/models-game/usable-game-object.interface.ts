import { PropertyModel } from './property-model';
import { RequirementsModel } from './requirements-model';
import { ApplicationType } from './e-item-type';

export interface UsableGameObject {
  properties: PropertyModel[];
  requirements: RequirementsModel;
  applicationType: ApplicationType;
}
