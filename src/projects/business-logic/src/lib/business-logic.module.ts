import { Inject, NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, SinglePlayerGame } from '@text-adventures/shared';
import { CreateCharacterService } from './character-management/create-character.service';
import { UserCharactersService } from './character-management/user-characters.service';
import { LoginUserService } from './login/login-user.service';
import { CommandHandlerService } from './single-player/command-handler.service';
import { CommandHelperService } from './single-player/command-helper.service';
import { CommandManagerAttributeService } from './single-player/command-manager-attribute.service';
import { CommandManagerBattleService } from './single-player/command-manager-battle.service';
import { CommandManagerInventoryService } from './single-player/command-manager-inventory.service';
import { CommandManagerSkillService } from './single-player/command-manager-skill.service';
import { CommandManagerStoryService } from './single-player/command-manager-story.service';
import { CommandOutputService } from './single-player/command-output.service';
import { SinglePlayerManagerService } from './single-player/single-player-manager.service';
import { BattleService } from './story-management/battle.service';
import { CharacterStoryService } from './story-management/character-story.service';
import { StoryPageService } from './story-management/story-page.service';
import { SinglePlayerBattleTeamManagerService } from './single-player/single-player-battle-team-manager.service';
import { SinglePlayerBattlePlayerManagerService } from './single-player/single-player-battle-player-manager.service';



@NgModule({
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService, useClass: LoginUserService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateCharacterService, useClass: CreateCharacterService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService, useClass: UserCharactersService },
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
  ]
})
export class BusinessLogicModule {
  constructor(
    singlePlayerBattle: SinglePlayerBattleTeamManagerService
  ) { }
}
