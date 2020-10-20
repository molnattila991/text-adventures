import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomManagementModule } from './room/room-management.module';
import { MultiPlayerGameModule } from './game/multi-player-game.module';
import { CreateRoomContainerComponent } from './room/create-room/create-room-container/create-room-container.component';
import { ListRoomContainerComponent } from './room/list-room/list-room-container/list-room-container.component';
import { MultiPlayerContainerComponent } from './game/multi-player-container/multi-player-container.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RoomManagementModule,
    MultiPlayerGameModule

  ],
  exports: [
    CreateRoomContainerComponent,
    ListRoomContainerComponent,
    MultiPlayerContainerComponent
  ]
})
export class MultiPlayerModule { }
