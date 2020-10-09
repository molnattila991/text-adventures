import { Injectable } from '@angular/core';
import { SinglePlayerCommands } from '@text-adventures/shared';

@Injectable()
export class CommandHelperService {
  commands = SinglePlayerCommands;
  constructor() { }

  getCommands() {
    const cmds = this.commands;

    const rows: string[] = [];
    const keys: string[] = Object.keys(cmds).filter(k => k != "description");

    for (const key of keys) {
      rows.push(key + "      " + cmds[key].description);
    }

    return rows;
  }

  getTypedCommands(type: string) {
    const cmds = this.commands[type];
    if (cmds) {

      const rows: string[] = [];
      const keys: string[] = Object.keys(cmds).filter(k => k != "description" && k != "params" && k != "default");

      for (const key of keys) {
        rows.push(key + "      " + cmds[key].description);
      }

      return rows;
    } else {
      return ["Command " + type + " is not valid. Type 'help' for listing valid commands"];
    }
  }

  getTypedSubCommands(type: string, subtype: string) {
    const cmds = this.commands[type];
    if (cmds) {
      if (cmds[subtype]) {
        const rows: string[] = [];
        rows.push("Usage of '" + type + " " + subtype + "':")
        cmds[subtype].description && rows.push("Description: " + cmds[subtype].description);
        cmds[subtype].params && rows.push("Parameters: " + cmds[subtype].params);
        cmds[subtype].default && rows.push("Default Parameter: " + cmds[subtype].default);


        return rows;
      } else {
        return ["Command " + subtype + " is not valid. Type 'help " + type + "' for listing valid commands"];
      }
    } else {
      return ["Command " + type + " is not valid. Type 'help' for listing valid commands"];
    }
  }
}