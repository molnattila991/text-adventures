import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-single-player-view',
  template: `
    <div class="command-container">
      <div class="command-output-container">

          <div style="white-space: pre-wrap;" *ngFor="let result of output">
            {{result}}
          </div>

      </div>
      <div class="command-text">
        <input style="width:89%" 
            [formControl]="commandFormControl" id="commandInput"/>
        <button style="width:10%" (click)="performCommnad.emit(commandFormControl.value)">
          Perform
        </button>
      </div>
    </div>
  `,
  styles: [
    ".command-container{position: relative; white-space: pre-wrap;height:500px;border: 1px solid black; background-color:gray;}",
    ".command-output-container{position: absolute;white-space: pre-wrap; height:80%; overflow: auto; width:100%; top:0px;}",
    ".command-text{position: absolute; width:100%; bottom:0px;}"
  ]
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlayerViewComponent {
  @Input() output: string[] = [];
  @Output() performCommnad: EventEmitter<string> = new EventEmitter();
  commandFormControl: FormControl;
  constructor(builder: FormBuilder) {
    this.commandFormControl = builder.control("help");

    this.commandFormControl.valueChanges.subscribe(v => {
      console.log(v);
    });
  }
}
