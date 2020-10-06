import {
  MessageType,
  GameMessage,
  MessageStatus
} from './action-result.interface';

export class StaticGameMessages {
  //#region character
  public static CharacterDontHaveAnyPartsToUseThisItem = <GameMessage>{
    type: MessageType.information,
    message:
      'Nincs megfelelő testrésze a karakternek, hogy használja ezt az eszközt.',
    status: MessageStatus.new
  };

  public static CharacterDoesNotMeetRequirements = <GameMessage>{
    type: MessageType.information,
    message:
      'A karakter nem felel meg a minimális követelményeknek az eszköz használatához.',
    status: MessageStatus.new
  };

  public static CharacterDoesNotHaveEnoughtBodyParts = <GameMessage>{
    type: MessageType.information,
    message:
      'Nincs elegendő testrésze a karakternek, hogy használja ezt az eszközt.',
    status: MessageStatus.new
  };

  public static CharacterDoesNotHaveEnoughtItemsToPerformAction = <GameMessage>{
    type: MessageType.information,
    message:
      'Nincs elegendő eszköze a karakternak a művelet végrehajtásához.',
    status: MessageStatus.new
  };

  public static CharacterDroppedItem = <GameMessage>{
    type: MessageType.information,
    message:
      'Eszköz eldobva.',
    status: MessageStatus.new
  };
  //#endregion
}
