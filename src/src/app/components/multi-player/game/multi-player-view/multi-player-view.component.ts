import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { CommandOutputMessage } from '@text-adventures/shared';

@Component({
  selector: 'app-multi-player-view',
  template: `
    <div class="command-container">
      <div class="command-output-container">

          <div style="white-space: pre-wrap;" tabindex="0" *ngFor="let result of output">
            {{result.message}} <a *ngIf="result.type!=undefined" tabindex="0" (keyup.enter)="showActions.emit(result)" (click)="showActions.emit(result)">Műveletek</a>
          </div>

      </div>
      <div class="command-text">
        <input style="width:89%"  (keyup.enter)="send()"
            [formControl]="commandFormControl" id="commandInput"/>
        <button style="width:10%" (click)="send()">
          Perform
        </button>
      </div>
    </div>
  `,
  styles: [
    ".command-container{font-size: 25px;color: white;position: relative; white-space: pre-wrap;height:500px;border: 1px solid black; background-color:gray;}",
    ".command-output-container{position: absolute;white-space: pre-wrap; height:80%; overflow: auto; width:100%; top:0px;}",
    ".command-text{position: absolute; width:100%; bottom:0px;}"
  ]
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiPlayerViewComponent {
  @Input() output: CommandOutputMessage[] = [];
  @Output() performCommnad: EventEmitter<string> = new EventEmitter();
  @Output() showActions: EventEmitter<CommandOutputMessage> = new EventEmitter();

  commandFormControl: FormControl;
  constructor(builder: FormBuilder) {
    this.commandFormControl = builder.control("game vote");
  }

  send() {
    this.performCommnad.emit(this.commandFormControl.value);
    // this.commandFormControl.setValue("");
  }
}
