import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModelsModule } from '@text-adventures/shared';
import { FirebaseProvidersModule, FirestoreBeModule } from '@text-adventures/firestore-be';
import { DataProviderModule, DataProviderProvidersModule } from '@text-adventures/data-provider';
import { StateManagerModule } from '@text-adventures/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModelsModule,
    FirebaseProvidersModule,
    FirestoreBeModule,
    DataProviderModule,
    DataProviderProvidersModule,
    StateManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }