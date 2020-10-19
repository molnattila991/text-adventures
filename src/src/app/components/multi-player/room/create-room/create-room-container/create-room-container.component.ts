import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-room-container',
  template: `
  <app-create-room-view>
  </app-create-room-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoomContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
