import { Inject, NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, SinglePlayerGame } from '@text-adventures/shared';
import { CreateCharacterService } from './character-management/create-character.service';
import { UserCharactersService } from './character-management/user-characters.service';
import { LoginUserService } from './login/login-user.service';
import { CommandHandlerService } from './single-player/command-handler.service';
import { CommandHelperService } from './single-player/command-helper.service';
import { CommandManagerSkillService } from './single-player/command-manager-skill.service';
import { CommandManagerStoryService } from './single-player/command-manager-story.service';
import { CommandOutputService } from './single-player/command-output.service';
import { SinglePlayerManagerService } from './single-player/single-player-manager.service';
import { CharacterStoryService } from './story-management/character-story.service';



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
    CommandManagerSkillService
  ]
})
export class BusinessLogicModule {
  constructor(
  ) { }
}
