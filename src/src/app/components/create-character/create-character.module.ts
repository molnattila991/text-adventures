import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCharacterContainerComponent } from './create-character-container/create-character-container.component';
import { CreateCharacterViewComponent } from './create-character-view/create-character-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CreateCharacterContainerComponent, CreateCharacterViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [CreateCharacterContainerComponent]
})
export class CreateCharacterModule { }
