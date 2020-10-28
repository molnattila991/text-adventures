import { NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { CreateCharacterService } from '../character-management/create-character.service';
import { BattleService } from '../story-management/battle.service';
import { CharacterStoryService } from '../story-management/character-story.service';
import { StoryPageService } from '../story-management/story-page.service';
import { CommandHandlerService } from './command-handler.service';
import { CommandHelperService } from './command-helper.service';
import { CommandManagerAttributeService } from './command-manager-attribute.service';
import { CommandManagerBattleService } from './command-manager-battle.service';
import { CommandManagerInventoryService } from './command-manager-inventory.service';
import { CommandManagerSkillService } from './command-manager-skill.service';
import { CommandManagerStoryService } from './command-manager-story.service';
import { CommandOutputService } from './command-output.service';
import { SinglePlayerBattleAttackManagerService } from './single-player-battle-attack-manager.service';
import { SinglePlayerBattlePlayerManagerService } from './single-player-battle-player-manager.service';
import { SinglePlayerBattleTeamManagerService } from './single-player-battle-team-manager.service';
import { SinglePlayerManagerService } from './single-player-manager.service';

@NgModule({
    providers: [
      { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateCharacterService, useClass: CreateCharacterService },
      { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService, useClass: CharacterStoryService },
      { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.SinglePlayerManagerService, useClass: SinglePlayerManagerService },
      { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CommandHandlerService, useClass: CommandHandlerService },
      { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService, useClass: CommandOutputService },
      CommandHelperService,
      CommandManagerStoryService,
      CommandManagerSkillService,
      CommandManagerAttributeService,
      CommandManagerInventoryService,
      BattleService,
      CommandManagerBattleService,
      StoryPageService,
      SinglePlayerBattleTeamManagerService,
      SinglePlayerBattlePlayerManagerService,
      SinglePlayerBattleAttackManagerService
    ]
  })
  export class SinglePlayerProvider {
    constructor(
      private singlePlayerBattle: SinglePlayerBattleTeamManagerService,
      private singlePlayerBattleAttackManagerService: SinglePlayerBattleAttackManagerService
    ) { }
  }
  