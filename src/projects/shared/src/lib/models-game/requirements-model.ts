import { PropertyType } from "./e-property-type";
import { PropertyValueType } from "./e-property-value-type";

export interface RequirementAbilityModel {
    abilityId: string;
    requiredLevel: number;
}

export interface RequirementItemModel {
    itemId: string;
    requiredCount: number;
}

export interface RequirementCharacterAttributeModel {
    type: PropertyType;
    value: number;
    valueType: PropertyValueType;
}

export interface RequirementsModel {
    items: RequirementItemModel[];
    abilities: RequirementAbilityModel[];
    storyIds: string[];
    characterAttributes: RequirementCharacterAttributeModel[];
}
