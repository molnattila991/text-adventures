import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutput, CommandOutputMessage } from '@text-adventures/shared';
import { CommandHandlerService } from 'projects/business-logic/src/lib/single-player/command-handler.service';

@Component({
  selector: 'app-single-player-container',
  template: `
    <app-single-player-view 
    [output]="output.get()|async" 
    (performCommnad)="performCommnad($event)"
    (showActions)="showActions($event)"></app-single-player-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlayerContainerComponent implements OnInit {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) public output: CommandOutput,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandHandlerService) private handler: CommandHandlerService
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
