import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';
import { CreateRoomService } from './room/create-room.service';
import { SelectedRoomService } from './room/selected-room.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.CreateRoomService, useClass: CreateRoomService },
    { provide: BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService, useClass: SelectedRoomService },

  ]
})
export class MultiGameModule { }
