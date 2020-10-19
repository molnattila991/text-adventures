import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRoomContainerComponent } from './create-room/create-room-container/create-room-container.component';
import { CreateRoomViewComponent } from './create-room/create-room-view/create-room-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListRoomViewComponent } from './list-room/list-room-view/list-room-view.component';
import { ListRoomContainerComponent } from './list-room/list-room-container/list-room-container.component';



@NgModule({
  declarations: [
    CreateRoomContainerComponent,
    CreateRoomViewComponent,
    ListRoomViewComponent,
    ListRoomContainerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CreateRoomContainerComponent,
    ListRoomContainerComponent
  ]
})
export class RoomManagementModule { }
