import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { ProjectsModuleProviderModule } from './projects-module-provider.module';
import { CreateCharacterModule } from './components/create-character/create-character.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    CreateCharacterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
