import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, SinglePlayerCommands } from '@text-adventures/shared';
import { CommandHelperService } from './command-helper.service';

@Injectable()
export class CommandHandlerService {
  commands = SinglePlayerCommands;
  constructor(
    private commandHelper: CommandHelperService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite
  ) { }

  perform(command: string) {
    const commandParts: string[] = command.toLocaleLowerCase().split(" ");
    if (commandParts == undefined || commandParts.length == 0) {

    }

    switch (commandParts[0]) {
      case "history":
        break;
      case "help":
        this.output.pushAndFlush(this.commandHelper.getCommands())
        break;
      case "go":
        break;
      case "story":
        break;
      case "attributes":
        break;
      case "skills":
        break;
      case "inventory":
        break;
      case "enemies":
        break;
    }
  }
}
