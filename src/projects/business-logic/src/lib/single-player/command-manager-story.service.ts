import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandManager, CommandOutputWrite, SinglePlayerGame } from '@text-adventures/shared';
import { StoryStateService } from '../story-management/story-state.service';

@Injectable()
export class CommandManagerStoryService implements CommandManager {

  constructor(
    private storyStateService: StoryStateService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SinglePlayerManagerService) private singlePlayerGame: SinglePlayerGame

  ) {
  }

  handle(commandParts: string[]): void {
    if (commandParts[1]) {
      switch (commandParts[1]) {
        case "start":
          const result = confirm("Biztos vagy benne?");
          result && this.singlePlayerGame.start();
          break;
        case "inspect":
          this.singlePlayerGame.inspect();
          break;
        case "select":
          if (commandParts[2]) {
            const index = Number.parseInt(commandParts[2]);
            if (isNaN(index) == false) {
              this.singlePlayerGame.selectOptionByIndex(index)
            } else {
              this.output.pushText(["Index must be number."]);
              this.output.pushHelp("story select");
              this.output.flush();
            }
          } else {
            this.output.pushHelp("story select");
            this.output.flush();
          }

          break;
      }
    } else {
      this.output.pushHelp("story");
      this.output.flush();
    }
  }
}
