import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterPlayerCreateModel, SelectItem } from '@text-adventures/shared';

@Component({
  selector: 'app-create-character-view',
  template: `
    <div>
      <form [formGroup]="formGroup">
        <mat-form-field class="example-full-width">
          <mat-label>Karakter név:</mat-label>
          <input matInput formControlName="characterName">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Karakter típus</mat-label>
          <mat-select formControlName="characterId">
            <mat-option *ngFor="let character of characterList"  [value]="character.id">
              {{character.text}}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <button (click)="save()">Létrehoz</button>
      </form>
    </div>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterViewComponent {
  formGroup: FormGroup;
  @Output() saved: EventEmitter<CharacterPlayerCreateModel> = new EventEmitter();
  @Input() characterList: SelectItem[] = [];
  constructor(private builder: FormBuilder) {
    this.formGroup = this.builder.group({
      characterName: "",
      characterId: ""
    });
  }

  save() {
    this.saved.emit(this.formGroup.value);
  }
}
