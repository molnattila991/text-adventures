import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ISelectedItemService, ISelectedItemsService, SelectedRoomManagement } from '@text-adventures/business-logic';
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


    <div *ngIf="selectedRoom.getSelectedItem()|async; let item">
      <div *ngFor="let team of item.teams">
        <h2>
          {{team.name}} 
          <button (click)="selectedRoomService.join(team.name)">Join</button>
          <button (click)="selectedRoomService.exit(team.name)">Exit</button>
        </h2>
        <ul>
          <li *ngFor="let member of team.teamMembers">
              {{member.playerID}}
          </li>
        </ul>
      </div>
    </div>

    {{selectedCharacters.getSelectedItemList()|async|json}}

  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRoomContainerComponent {

  constructor(
    @Inject(STORE_INJECTION_TOKEN.RoomsTitleStoreService) public store: BaseDataCollection<RoomTitleModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) public selectedRoom: ISelectedItemService<RoomModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedCharactersService) public selectedCharacters: ISelectedItemsService<RoomModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) public selectedRoomService: SelectedRoomManagement
  ) { 
  }

  select(id): void {
    this.selectedRoom.select(id);
  }
}
