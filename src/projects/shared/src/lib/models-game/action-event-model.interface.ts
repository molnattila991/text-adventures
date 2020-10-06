import { EffectDirection } from './e-effect-direction';
import { PropertyType } from "./e-property-type";
import { PropertyValueType } from "./e-property-value-type";

export interface ActionEventAbilityModel {
    abilityId: string;
    level: number;
    direction: EffectDirection;
}

export interface ActionEventItemModel {
    itemId: string;
    count: number;
    direction: EffectDirection;
}

export interface ActionEventCharacterAttributeModel {
    type: PropertyType;
    value: number;
    valueType: PropertyValueType;
}

export interface ActionEventModel {
    items: ActionEventItemModel[];
    abilities: ActionEventAbilityModel[];
    storyIds: string[];
    characterAttributes: ActionEventCharacterAttributeModel[];
}