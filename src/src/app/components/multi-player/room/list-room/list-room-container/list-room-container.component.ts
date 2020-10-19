import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseDataCollection, RoomTitleModel, STORE_INJECTION_TOKEN } from '@text-adventures/shared';

@Component({
  selector: 'app-list-room-container',
  template: `
    <app-list-room-view [rooms]="store.getSelectList()|async">
    </app-list-room-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRoomContainerComponent {

  constructor(
    @Inject(STORE_INJECTION_TOKEN.RoomsTitleStoreService) public store: BaseDataCollection<RoomTitleModel>
  ) { }
}
