import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerContainerComponent } from './single-player-container/single-player-container.component';
import { SinglePlayerViewComponent } from './single-player-view/single-player-view.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SinglePlayerContainerComponent, SinglePlayerViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SinglePlayerContainerComponent
  ]
})
export class SinglePlayerModule { }
