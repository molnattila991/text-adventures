import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  template: `
    <form [formGroup]="formGroup">
      <input formControlName="name" type="text"/>
      <button (click)="saved()">Bejelentkezés</button>
    </form>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent {
  @Output() submitted: EventEmitter<string> = new EventEmitter();
  formGroup: FormGroup;
  constructor(private builder: FormBuilder) {
    this.formGroup = this.builder.group({
      name: ""
    });
  }

  saved() {
    this.submitted.emit(this.formGroup.value["name"]);
  }
}
