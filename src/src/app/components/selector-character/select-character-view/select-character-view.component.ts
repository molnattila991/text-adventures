import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { CharacterPlayerModel, HashMap } from '@text-adventures/shared';

@Component({
  selector: 'app-select-character-view',
  template: `
    <div>
      <ul>
        <li *ngFor="let character of characters">
          {{character.id}} {{character.name}} <button (click)="deleted.emit(character.id)">X</button>
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
  constructor() { }
}
