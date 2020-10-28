import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-room-view',
  template: `
    <div class="example-container">
      <mat-form-field appearance="fill">
        <mat-label>Szobanév</mat-label>
        <input [formControl]="nameFormControl" matInput>
      </mat-form-field>
      <button (click)="createRoom()">Létrehozás</button>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoomViewComponent {
  nameFormControl: FormControl;
  @Output() create: EventEmitter<string> = new EventEmitter();
  constructor() { 
    this.nameFormControl = new FormControl("");
  }

  createRoom(): void {
    const name = this.nameFormControl.value;
    this.create.emit(name);
  }
}
