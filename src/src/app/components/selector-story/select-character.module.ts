import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStoryContainerComponent } from './select-story-container/select-story-container.component';
import { SelectStoryViewComponent } from './select-story-view/select-story-view.component';



@NgModule({
  declarations: [SelectStoryContainerComponent, SelectStoryViewComponent],
  imports: [
    CommonModule
  ], exports: [SelectStoryContainerComponent]
})
export class SelectStoryModule { }
