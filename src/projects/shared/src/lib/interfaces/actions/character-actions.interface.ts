import { CharacterItemActions } from './character-item-actions.interface';
import { CharacterBattleActions } from './character-battle-actions.interface';
export interface CharacterActions
  extends CharacterItemActions,
    CharacterBattleActions {}
