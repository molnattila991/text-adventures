import { CharacterModel } from '../../models-game/character-model';
import { ItemModel } from '../../models-game/item-model';
import { ActionResult } from '@text-adventures/shared';
export interface CharacterItemActions {
  itemUse(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;
  itemPickUp(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;

  itemDrop(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;

  itemPutOn(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;
  itemPutOff(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;
  itemConsume(
    character: CharacterModel,
    item: ItemModel
  ): ActionResult<CharacterModel>;
}
