import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomTitleModel } from '@text-adventures/shared';

@Component({
  selector: 'app-list-room-view',
  template: `
    <ul>
      <li *ngFor="let title of rooms" tabindex=0 
      (keyup.enter)="selected.emit(title.roomId)" 
      (click)="selected.emit(title.roomId)">
        {{title.name}}
      </li>
    </ul>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListRoomViewComponent {
  @Input() rooms: RoomTitleModel[];
  @Output() selected: EventEmitter<string> = new EventEmitter();
  constructor() { }
}
