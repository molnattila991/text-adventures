import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, SinglePlayerCommands, SinglePlayerGame } from '@text-adventures/shared';
import { CommandHelperService } from './command-helper.service';
import { SinglePlayerManagerService } from './single-player-manager.service';

@Injectable()
export class CommandHandlerService {
  commands = SinglePlayerCommands;
  constructor(
    private commandHelper: CommandHelperService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SinglePlayerManagerService) private singlePlayerGame: SinglePlayerGame
  ) { }

  perform(command: string) {
    const commandParts: string[] = command.toLocaleLowerCase().split(" ");

    if (commandParts == undefined || commandParts.length == 0 || commandParts[0] == "") {
      this.output.pushAndFlush(["Please type 'help' to list avaiable commands"]);
      return;
    }

    if (commandParts[0] == "help") {
      //HELP
      this.handleHelp(commandParts);

    } else {
      //EXECUTE
      switch (commandParts[0]) {
        case "start":
          const result = confirm("Biztos vagy benne?");
          result && this.singlePlayerGame.start();
          break;
        case "history":
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
        default:
          this.output.pushAndFlush(["Command ('" + commandParts[0] + "') is not valid. Please type 'help' to list avaiable commands"]);
          break;
      }
    }
  }

  private handleHelp(commandParts: string[]) {
    this.output.push(["List of avaiable commands."]);

    if (commandParts.length == 1) {
      this.output.push(this.commandHelper.getCommands());
    } else if (commandParts.length > 2) {
      this.output.push(this.commandHelper.getTypedSubCommands(commandParts[1], commandParts[2]));
    } else if (commandParts.length > 1) {
      this.output.push(this.commandHelper.getTypedCommands(commandParts[1]));
    }
    this.output.pushAndFlush(["Run 'COMMAND --help' for more information on a command."]);
  }
}
