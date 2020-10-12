import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterModel, CharacterPlayerModel, CommandManager, CommandOutputWrite } from '@text-adventures/shared';
import { BattleService } from '../story-management/battle.service';


@Injectable()
export class CommandManagerBattleService implements CommandManager {

  constructor(
    private battleService: BattleService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite
  ) {
    this.battleService.getTeams().subscribe();
  }

  handle(commandParts: string[]): void {
    let command = commandParts[1];

    if (command) {
      switch (command) {
        case "list":
          break;
        case "inspect":
          break;
        case "target":
          break;
        case "attack":
          break;
        default:
          this.output.pushHelp("battle");
          break;
      }
    } else {
      this.output.pushHelp("battle");
    }
  }
}
