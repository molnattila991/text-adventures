import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutput, CommandOutputRead } from '@text-adventures/shared';
import { CommandHandlerService } from 'projects/business-logic/src/lib/single-player/command-handler.service';

@Component({
  selector: 'app-single-player-container',
  template: `
    <app-single-player-view [output]="output.get()|async" (performCommnad)="performCommnad($event)"></app-single-player-view>
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
    this.output.pushAndFlush(["Gépelje be az alábbi, hogy 'help' és nyomja meg az enter billentyűzetet."])
  }

  performCommnad(command: string) {
    this.handler.perform(command);
  }

}
