import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CharacterPlayerModel } from '@text-adventures/shared';

@Component({
  selector: 'app-select-character-view',
  template: `
    <div>
      <ul>
        <li *ngFor="let item of characters">
          {{item.id}} {{item.name}} 
          <button (click)="deleted.emit(item.id)">X</button>
          <button (click)="selected.emit(item.id)">Select</button>
        </li>
      </ul>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCharacterViewComponent {
  @Input() characters: CharacterPlayerModel[] = [];
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }
}
