import { Injectable } from '@angular/core';
import { BattleService } from '../story-management/battle.service';
import { StoryStateService } from '../story-management/story-state.service';

@Injectable()
export class SinglePlayerBattleTeamManagerService {

  constructor(
    private battleService: BattleService,
    private storyStateService: StoryStateService,
  ) {
    
  }
}
