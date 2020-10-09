import { Injectable } from '@angular/core';
import { SinglePlayerCommands } from '@text-adventures/shared';

@Injectable()
export class CommandHelperService {
  commands = SinglePlayerCommands;
  constructor() { }

  getCommands(level: number = 0, type?: string) {
    if (level == 0) {
      const rows: string[] = [];
      const keys: string[] = Object.keys(this.commands);

      for (const key of keys) {
        rows.push(key + "      " + this.commands[key].description);
      }

      rows.push("Run 'COMMAND --help' for more information on a command.");
      return rows;
    }

    return Object.keys(this.commands);
  }
}
