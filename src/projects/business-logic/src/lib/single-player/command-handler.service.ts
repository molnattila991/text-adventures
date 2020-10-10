import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, SinglePlayerCommands, SinglePlayerGame } from '@text-adventures/shared';
import { CommandHelperService } from './command-helper.service';

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
      this.output.pushAndFlush([{ message: "Please type 'help' to list avaiable commands" }]);
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
          this.handleStory(commandParts);
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
          this.output.pushText(["Command ('" + commandParts[0] + "') is not valid. Please type 'help' to list avaiable commands"]);
          break;
      }
    }
    this.output.flush();
  }

  private handleHelp(commandParts: string[]) {
    this.output.pushText(["List of avaiable commands."]);

    if (commandParts.length == 1) {
      this.output.pushText(this.commandHelper.getCommands());
    } else if (commandParts.length > 2) {
      this.output.pushText(this.commandHelper.getTypedSubCommands(commandParts[1], commandParts[2]));
    } else if (commandParts.length > 1) {
      this.output.pushText(this.commandHelper.getTypedCommands(commandParts[1]));
    }
    this.output.pushText(["Run 'help' for more information on a command."]);
  }

  handleStory(commandParts: string[]) {
    if (commandParts[1]) {
      switch (commandParts[1]) {
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
              this.pushHelpText("story select");
            }
          } else {
            this.pushHelpText("story select");
          }
          break;
      }
    } else {
      this.pushHelpText("story");
    }
  }

  private pushHelpText(command) {
    this.output.pushText(["Run 'help " + command + "' for more information on command."]);
  }
}
