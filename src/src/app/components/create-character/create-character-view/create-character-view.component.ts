import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SelectItem } from '@text-adventures/shared';

@Component({
  selector: 'app-create-character-view',
  template: `
    <div>
      <h4>Basic mat-select</h4>
      <mat-form-field appearance="fill">
        <mat-label>Favorite food</mat-label>
        <mat-select>
          <mat-option *ngFor="let character of characterList" [value]="character.id">
            {{character.text}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterViewComponent {
  @Input() characterList: SelectItem[] = [];
  constructor() { }
}
