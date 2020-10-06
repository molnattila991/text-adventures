import {
  GameMessage,
  MessageStatus,
  MessageType
} from '../models-game/action-result.interface';

export function CharacterInventoryWeightReachedMaxMessage(
  characterName: string,
  objectName: string,
  storyName: string
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message: 'Túl nehéz a csomat',
    type: MessageType.inventory
  };
}

export function CharacterInvenoryItemUsabilityTypeOnMaxMessage() {
  return <GameMessage>{
    status: MessageStatus.new,
    message: 'Nincs szabad testrészed az eszköz használatba vételéhez.',
    type: MessageType.inventory
  };
}
