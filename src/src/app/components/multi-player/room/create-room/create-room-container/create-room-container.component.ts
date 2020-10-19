import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CreateRoom } from '@text-adventures/business-logic';
import { BUSSINESS_LOGIC_INJECTION_TOKEN } from '@text-adventures/shared';

@Component({
  selector: 'app-create-room-container',
  template: `
  <app-create-room-view (create)="createRoomService.createRoom($event)">
  </app-create-room-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoomContainerComponent {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CreateRoomService) public createRoomService: CreateRoom
  ) { }
}
