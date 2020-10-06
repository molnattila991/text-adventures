import { AbilityModel } from '../../models-game/ability-model.interface';
import { ActionResultBin } from "../../models-game/action-result.interface";
import { CharacterModel } from '../../models-game/character-model';

export interface IBattleAttackService {
    selectTarget(target: CharacterModel): void;
    selectAbility(ability: AbilityModel): void;
    performAttack(source: CharacterModel): ActionResultBin<CharacterModel>;
}