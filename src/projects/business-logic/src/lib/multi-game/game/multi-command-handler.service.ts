import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite } from '@text-adventures/shared';
import { MultiCommandHelperService } from './multi-command-helper.service';

@Injectable()
export class MultiCommandHandlerService {
  constructor(
    private commandHelper: MultiCommandHelperService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
  ) { }

  perform(command: string) {
    const commandParts: string[] = command.toLocaleLowerCase().split(" ");

    if (commandParts == undefined || commandParts.length == 0 || commandParts[0] == "") {
      this.output.pushAndFlush([{ message: "Segítségért géped be a 'help' parancsot." }]);
      return;
    }

    if (commandParts[0] == "help") {
      //HELP
      this.handleHelp(commandParts);

    } else {
      //EXECUTE
      switch (commandParts[0]) {
        case "attributes":
          this.output.pushText(["attributes"]);
          break;
        case "skills":
          this.output.pushText(["skills"]);
          break;
        case "inventory":
          this.output.pushText(["inventory"]);
          break;
        case "battle":
          this.output.pushText(["battle"]);
          break;
        default:
          this.output.pushText(["A parancs ('" + commandParts[0] + "') nem megfelelő. Segítségért géped be a 'help' parancsot."]);
          break;
      }
    }

    this.output.flush();
  }

  private handleHelp(commandParts: string[]) {
    this.output.pushText(["A lehetséges parancsok listája.:"]);

    if (commandParts.length == 1) {
      this.output.pushText(this.commandHelper.getCommands());
    } else if (commandParts.length > 2) {
      this.output.pushText(this.commandHelper.getTypedSubCommands(commandParts[1], commandParts[2]));
    } else if (commandParts.length > 1) {
      this.output.pushText(this.commandHelper.getTypedCommands(commandParts[1]));
    }
    // this.output.pushText(["Részletetekért add ki a 'help + ' for more information on a command."]);
  }
}
