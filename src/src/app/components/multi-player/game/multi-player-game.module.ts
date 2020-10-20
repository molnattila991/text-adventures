import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiPlayerContainerComponent } from './multi-player-container/multi-player-container.component';
import { MultiPlayerViewComponent } from './multi-player-view/multi-player-view.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MultiPlayerContainerComponent, MultiPlayerViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [MultiPlayerContainerComponent]
})
export class MultiPlayerGameModule { }
