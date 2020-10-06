import { PropertyModel } from './property-model';
import { InventoryModel } from './item-model';
import { HashMap } from '../models-be-connector/hash-map.interface';

export interface CharacterAbilityModel {
  abilityId: string;
  level: number;
}

export interface CharacterItemModel {
  itemId: string;
  count: number;
}

export interface CharacterModel {
  id?: string;
  name: string;
  characterName: string;
  description: string;
  inventory: Partial<InventoryModel>;
  abilities: HashMap<CharacterAbilityModel>;
  items: HashMap<CharacterItemModel>;
  attributes: HashMap<PropertyModel>;
  stories: string[];
}

export interface CharacterPlayerModel extends CharacterModel {
  userId: string;
}
