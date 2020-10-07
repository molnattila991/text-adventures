import { NgModule } from '@angular/core';
import { BusinessLogicModule } from '@text-adventures/business-logic';
import { DataProviderModule, DataProviderProvidersModule } from '@text-adventures/data-provider';
import { FirebaseProvidersModule, FirestoreBeModule } from '@text-adventures/firestore-be';
import { SharedModelsModule } from '@text-adventures/shared';
import { StateManagerModule } from '@text-adventures/store';



@NgModule({
  declarations: [],
  imports: [
    SharedModelsModule,
    FirebaseProvidersModule,
    FirestoreBeModule,
    DataProviderModule,
    DataProviderProvidersModule,
    StateManagerModule,
    BusinessLogicModule 
  ]
})
export class ProjectsModuleProviderModule { }
