import { NgModule } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { UserCharactersService } from './character-management/user-characters.service';
import { LoginUserService } from './login/login-user.service';
import { MultiGameMergeLogsService } from './multi-game/logging/multi-game-merge-logs.service';
import { MultiGameModule } from './multi-game/multi-game.module';
import { SinglePlayerProvider } from './single-player/single-player-provider.module';



@NgModule({
  providers: [
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService, useClass: UserCharactersService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService, useClass: LoginUserService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.MultiGameMergeLogsService, useClass: MultiGameMergeLogsService },    
  ],
  imports: [
    SinglePlayerProvider,
    MultiGameModule
  ]
})
export class BusinessLogicModule {
  constructor() { }
}
