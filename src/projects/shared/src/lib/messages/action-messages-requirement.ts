import {
  GameMessage,
  MessageStatus,
  MessageType
} from '../models-game/action-result.interface';

export function CharacterDoesNotMeetItemRequirementsMessage(
  characterName: string,
  itemName: any,
  requiredItemName: string,
  count: number
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message:
      itemName +
      ' használatához szükség van ' +
      count +
      ' db ' +
      requiredItemName +
      '-ra.',
    type: MessageType.requirement
  };
}

export function CharacterDoesNotMeetAbilityRequirementsMessage(
  characterName: string,
  abilityName: any,
  requiredAbilityName: string,
  level: number
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message:
      abilityName +
      ' használatához szükség van ' +
      level +
      ' szintű ' +
      requiredAbilityName +
      '-ra.',
    type: MessageType.requirement
  };
}

export function CharacterDoesNotMeetAttributeRequirementsMessage(
  characterName: string,
  attributeName: any,
  value: number
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message: 'A használathoz szükséges ' + attributeName + ' ' + value + '.',
    type: MessageType.requirement
  };
}

export function CharacterDoesNotMeetStoryRequirementsMessage(
  characterName: string,
  objectName: string,
  storyName: string
) {
  return <GameMessage>{
    status: MessageStatus.new,
    message:
      'A következő történet szükséges ' +
      objectName +
      ' használatához: ' +
      storyName +
      '.',
    type: MessageType.requirement
  };
}
