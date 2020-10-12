import { CharacterItemModel, CharacterItemModelExpanded } from './character-model';
import { HashMap } from './../models-be-connector/hash-map.interface';
import {
  PropertyModel,
  RequirementsModel
} from '@text-adventures/shared';
import { ApplicationType, ItemUsabilityType, ItemType } from './e-item-type';
import { UsableGameObject } from './usable-game-object.interface';

export class InventoryItemUsabilityManagerModelExpanded {
  itemUsabilityType: ItemUsabilityType;
  maxCount: number;
  actualCount: number;
}

export class InventoryItemUsabilityManagerModel {
  itemUsabilityType: ItemUsabilityType;
  maxCount: number;
  actualCount: number;
}

export class InventoryModelExpanded {
  maxLoad: number;
  actualLoad: number;
  inventoryItemUsabilityManager: InventoryItemUsabilityManagerModelExpanded[];
  items: HashMap<CharacterItemModelExpanded>;
}

export class InventoryModel {
  maxLoad: number;
  actualLoad: number;
  inventoryItemUsabilityManager: InventoryItemUsabilityManagerModel[];
  items: HashMap<CharacterItemModel>;
}

export class ItemModel implements UsableGameObject {
  id?: string;
  /**Name of the item. */
  name: string;

  /**Description of the item. */
  description: string;

  /**Weight of the item. */
  weight: number;

  /**The requirements of the item.*/
  requirements: RequirementsModel | any;

  /**It shows how the character can use this item.*/
  applicationType: ApplicationType;

  /**It shows which body part of the character can use this item. */
  usabilityType: ItemUsabilityType;

  /**It shows what kind of item it is. For example: weapon, shield...*/
  itemType: ItemType;

  /** It lists how many and what kind of properties owned by the item. */
  properties: PropertyModel[];

  constructor() {
    this.weight = 0;
    this.usabilityType = 0;
    this.requirements = undefined;
    this.properties = [];
    this.name = '';
    this.itemType = 0;
    this.description = '';
    this.applicationType = 0;
  }
}
