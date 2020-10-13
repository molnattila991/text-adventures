import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite } from '@text-adventures/shared';
import { CommandHelperService } from './command-helper.service';
import { CommandManagerStoryService } from './command-manager-story.service';
import { CommandManagerSkillService } from './command-manager-skill.service';
import { CommandManagerAttributeService } from './command-manager-attribute.service';
import { CommandManagerInventoryService } from './command-manager-inventory.service';
import { CommandManagerBattleService } from './command-manager-battle.service';

@Injectable()
export class CommandHandlerService {
  constructor(
    private commandHelper: CommandHelperService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    private storyCommandManager: CommandManagerStoryService,
    private skillCommandManager: CommandManagerSkillService,
    private attributeCommandManager: CommandManagerAttributeService,
    private inventoryCommandManager: CommandManagerInventoryService,
    private battleCommandManager: CommandManagerBattleService
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
        case "story":
          this.storyCommandManager.handle(commandParts);
          break;
        case "attributes":
          this.attributeCommandManager.handle(commandParts);
          break;
        case "skills":
          this.skillCommandManager.handle(commandParts);
          break;
        case "inventory":
          this.inventoryCommandManager.handle(commandParts);
          break;
        case "battle":
          this.battleCommandManager.handle(commandParts);
          break;
        default:
          this.output.pushText(["Command ('" + commandParts[0] + "') is not valid. Please type 'help' to list avaiable commands"]);
          break;
      }
    }
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
}
