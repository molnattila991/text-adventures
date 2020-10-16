import { PropertyModel } from './property-model';
import { InventoryModel, InventoryModelExpanded, ItemModel } from './item-model';
import { HashMap } from '../models-be-connector/hash-map.interface';
import { AbilityModel } from './ability-model.interface';

export interface CharacterAbilityModelExpanded {
  ability: AbilityModel;
  level: number;
}

export interface CharacterAbilityModel {
  abilityId: string;
  level: number;
}

export interface CharacterItemModelExpanded  {
  item: ItemModel;
  count: number;
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

export interface CharacterModelExpanded {
  id?: string;
  name: string;
  characterName: string;
  description: string;
  inventory: Partial<InventoryModelExpanded>;
  abilities: HashMap<CharacterAbilityModelExpanded>;
  items: HashMap<CharacterItemModelExpanded>;
  attributes: HashMap<PropertyModel>;
  index: number;
  autoPlayer: boolean;
  stories: string[];
}

export interface CharacterPlayerModelExpanded extends CharacterModelExpanded {
  userId: string;
}

export interface CharacterPlayerModel extends CharacterModel {
  userId: string;
}

export interface CharacterPlayerCreateModel{
  characterName: string;
  characterId: string;
  userId: string;
}
