import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ISelectedItemService } from '@text-adventures/business-logic';
import { BaseDataCollection, BUSSINESS_LOGIC_INJECTION_TOKEN, RoomModel, RoomTitleModel, STORE_INJECTION_TOKEN } from '@text-adventures/shared';

@Component({
  selector: 'app-list-room-container',
  template: `
    <app-list-room-view 
    [rooms]="store.getList()|async"
    (selected)="select($event)"
    >
    </app-list-room-view>

    {{selectedRoom.getSelectedItem()|async|json}}
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRoomContainerComponent {

  constructor(
    @Inject(STORE_INJECTION_TOKEN.RoomsTitleStoreService) public store: BaseDataCollection<RoomTitleModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) public selectedRoom: ISelectedItemService<RoomModel>
  ) {

  }

  select(id): void {
    this.selectedRoom.select(id);
  }
}
