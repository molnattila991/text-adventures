import {
  GameMessage,
  MessageStatus,
  MessageType
} from '../models-game/action-result.interface';

export function CharacterAttributeChangedMessage(
  characterName: string,
  value: any,
  propertyTypeName: string | number
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message:
      characterName + ' ' + propertyTypeName + '-e módosult ' + value + '-vel.',
    type: MessageType.attributes
  };
}

export function CharacterItemsChangedMessage(
  characterName: string,
  itemName: any,
  count: number
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message: characterName + ' ' + itemName + '-e módosult ' + count + '-vel.',
    type: MessageType.items
  };
}
