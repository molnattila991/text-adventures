import { NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { CreateCharacterService } from './character-management/create-character.service';
import { UserCharactersService } from './character-management/user-characters.service';
import { LoginUserService } from './login/login-user.service';
import { CharacterStoryService } from './story-management/character-story.service';



@NgModule({
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService, useClass: LoginUserService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateCharacterService, useClass: CreateCharacterService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService, useClass: UserCharactersService},
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CharacterStoryService, useClass: CharacterStoryService}
  ]
})
export class BusinessLogicModule { }
