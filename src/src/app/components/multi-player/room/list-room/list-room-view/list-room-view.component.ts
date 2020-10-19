import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoomTitleModel, SelectItem } from '@text-adventures/shared';

@Component({
  selector: 'app-list-room-view',
  template: `
    <ul>
      <li *ngFor="let room of rooms">
        {{room.text}}
      </li>
    </ul>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRoomViewComponent {
  @Input() rooms: SelectItem[];
  constructor() { }
}
