import { Injectable } from '@angular/core';
import { CharacterSelectorService } from '../characters/character-selector.service';

@Injectable()
export class MultiGameRoundManagerService {

  constructor(
    private characterSelectorService: CharacterSelectorService
  ) { }

  startNewRound(): void {

  }

  startNewPlayers(): void {

  }
}
