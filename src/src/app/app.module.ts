import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { ProjectsModuleProviderModule } from './projects-module-provider.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ProjectsModuleProviderModule,

    LoginModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
