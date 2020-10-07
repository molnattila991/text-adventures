import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCharacterContainerComponent } from './select-character-container/select-character-container.component';
import { SelectCharacterViewComponent } from './select-character-view/select-character-view.component';



@NgModule({
  declarations: [SelectCharacterContainerComponent, SelectCharacterViewComponent],
  imports: [
    CommonModule
  ],
  exports:[SelectCharacterContainerComponent]
})
export class SelectCharacterModule { }
