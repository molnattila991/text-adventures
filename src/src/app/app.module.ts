import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { ProjectsModuleProviderModule } from './projects-module-provider.module';
import { CreateCharacterModule } from './components/create-character/create-character.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectCharacterModule } from './components/selector-character/select-character.module';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling } from '@text-adventures/shared';
import { SelectStoryModule } from './components/selector-story/select-character.module';
import { SinglePlayerModule } from './components/single-player/single-player.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ProjectsModuleProviderModule,

    LoginModule,
    CreateCharacterModule,
    SelectCharacterModule,
    SelectStoryModule,
    SinglePlayerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private userService: UserHandling
  ) { }
}
