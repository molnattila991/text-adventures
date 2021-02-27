import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MultiCommandHandlerService } from '@text-adventures/business-logic';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputMessage, CommandOutputRead, CommandOutputWrite } from '@text-adventures/shared';

@Component({
  selector: 'app-multi-player-container',
  template: `
    <app-multi-player-view 
    [output]="read.get()|async" 
    (performCommnad)="performCommnad($event)"
    (showActions)="showActions($event)"></app-multi-player-view>
  `,
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiPlayerContainerComponent implements OnInit {

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private write: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.MultiGameMergeLogsService) public read: CommandOutputRead,

    private handler: MultiCommandHandlerService
  ) { }

  ngOnInit(): void {
    //TODO init help text
    this.write.pushText(["Üdvözöllek kalandor. Amennyiben segítségre van szükséged, írd a 'help' parancsot az alábbi mezőbe."])
    this.write.flush();
  }

  performCommnad(command: string) {
    this.handler.perform(command);
  }

  showActions(output: CommandOutputMessage) {
    console.log(output);
  }
}
