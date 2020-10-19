import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-room-view',
  template: `
    <div class="example-container">
      <mat-form-field appearance="fill">
        <mat-label>Szobanév</mat-label>
        <input matInput>
      </mat-form-field>
      <button>Létrehozás</button>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoomViewComponent {

  constructor() { }
}
