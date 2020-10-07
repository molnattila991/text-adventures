import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { ProjectsModuleProviderModule } from './projects-module-provider.module';
import { CreateCharacterModule } from './components/create-character/create-character.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectCharacterModule } from './components/selector-character/select-character.module';

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
    SelectCharacterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
