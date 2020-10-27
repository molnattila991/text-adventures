import { Injectable } from '@angular/core';
import { CharacterSelectorService } from './character-selector.service';

@Injectable()
export class MultiGameRoundManagerService {

  constructor(
    private characterSelectorService: CharacterSelectorService
  ) { }

  startGame(): void {
    
  }

  startNewRound(): void {

  }

  startNewPlayers(): void {

  }
}
