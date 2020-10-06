import { RequirementsModel } from './requirements-model';
import { ApplicationType } from './e-item-type';
import { PropertyModel } from './property-model';
import { UsableGameObject } from './usable-game-object.interface';

export enum AbilityType {
  Phisical,
  Magical
}

export class AbilityModel implements UsableGameObject {
  id?: string;
  name: string;
  description: string;
  requirements: RequirementsModel;
  actualLevel: number;
  abilityType: AbilityType;
  applicationType: ApplicationType;
  properties: PropertyModel[];

  /**Character can only use this ability in the listed stories */
  onlyInStories: string[];
  constructor() {
    this.actualLevel = 1;
    this.abilityType = AbilityType.Phisical;
    this.applicationType = 0;
    this.properties = [];
  }
}
