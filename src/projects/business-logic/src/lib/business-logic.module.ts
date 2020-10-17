import { NgModule } from '@angular/core';
import { SinglePlayerProvider } from './single-player/single-player-provider.module';



@NgModule({
  providers: [
  ],
  imports: [
    SinglePlayerProvider
  ]
})
export class BusinessLogicModule {
  constructor() { }
}
