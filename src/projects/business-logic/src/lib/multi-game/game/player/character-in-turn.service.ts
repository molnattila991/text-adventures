import { Injectable } from '@angular/core';
import { CurrentCharacterService } from '../../characters/current-character.service';
import { filter, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CharacterInTurnService {

  constructor(
    private currentCharacterService: CurrentCharacterService
  ) {
    this.currentCharacterService.isCurrentPlayerLoggedInPlayer().subscribe(v=>console.log(v));
    this.currentCharacterService.getCharacter().subscribe(v=>console.log(v));

    this.currentCharacterService.isCurrentPlayerLoggedInPlayer().pipe(
      filter(isCurrentPlayer => isCurrentPlayer),
      withLatestFrom(this.currentCharacterService.getCharacter())
    ).subscribe(v => console.log(v, "A te köröd, végezd el a lépéseid és szavazz a folytatáshoz"));

    this.currentCharacterService.isCurrentPlayerLoggedInPlayer().pipe(
      filter(isCurrentPlayer => isCurrentPlayer == false),
      withLatestFrom(this.currentCharacterService.getCharacter())
    ).subscribe(v => console.log(v, "Nem a te köröd, szavazz a folytatáshoz"));
  }
}
