import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MultiCommandHandlerService } from '@text-adventures/business-logic';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutput, CommandOutputMessage } from '@text-adventures/shared';

@Component({
  selector: 'app-multi-player-container',
  template: `
    <app-multi-player-view 
    [output]="output.get()|async" 
    (performCommnad)="performCommnad($event)"
    (showActions)="showActions($event)"></app-multi-player-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiPlayerContainerComponent implements OnInit {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) public output: CommandOutput,
    private handler: MultiCommandHandlerService
  ) { }

  ngOnInit(): void {
    //TODO init help text
    this.output.pushText(["Üdvözöllek kalandor. Amennyiben segítségre van szükséged, írd a 'help' parancsot az alábbi mezőbe."])
    this.output.flush();
  }

  performCommnad(command: string) {
    this.handler.perform(command);
  }

  showActions(output: CommandOutputMessage) {
    console.log(output);
  }
}
