import { ApplicationType } from './e-item-type';
import { PropertyType } from './e-property-type';
import { EffectDirection } from './e-effect-direction';
import { PropertyValueType } from './e-property-value-type';

export interface PropertyModel {
  type: PropertyType;
  value: number;
  valueType: PropertyValueType;
  direction: EffectDirection;
  applicationType: ApplicationType;
}
