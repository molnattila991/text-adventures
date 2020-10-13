import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandManager, CommandOutputMessage, CommandOutputType, CommandOutputWrite, UserCharacters } from '@text-adventures/shared';
import { BattleService, BattleTeam } from '../story-management/battle.service';
import { Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class CommandManagerBattleService implements CommandManager {

  private list$: Subject<string> = new Subject();
  constructor(
    private battleService: BattleService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private userCharactersService: UserCharacters,
  ) {
    this.listSubscription();
  }

  handle(commandParts: string[]): void {
    let command = commandParts[1];

    if (command) {
      switch (command) {
        case "list":
          this.list(commandParts);
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

    this.output.flush();
  }

  private listSubscription() {
    this.list$.pipe(
      withLatestFrom(
        this.battleService.getTeams(),
        this.userCharactersService.getSelectedCharacter()
      ),
      map(([command, teams, selectedUser]) => {
        if (command == "all") {
          return teams;
        } else if (command == "enemies") {
          let teamOfPlayer: BattleTeam;
          teams.map(team => {
            const member = team.teamMembers.find(member => member.id == selectedUser.id);
            if (member) {
              teamOfPlayer = team;
            }
          });
          return teams.filter(t => t.teamIndex != teamOfPlayer.teamIndex);
        } else if (command == "mates") {
          let teamOfPlayer: BattleTeam;
          teams.map(team => {
            const member = team.teamMembers.find(member => member.id == selectedUser.id);
            if (member) {
              teamOfPlayer = team;
            }
          });
          return [teamOfPlayer];
        }
      })
    ).subscribe(teams => {
      teams.forEach(team => {
        this.output.pushText(["Csapat: " + team.teamName]);
        team.teamMembers.forEach(member => {
          this.output.push([<CommandOutputMessage>{ id: member.id, type: CommandOutputType.Character, message: "Karakter: " + member.name }]);
        })
      })
    });
  }

  private list(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      if (listParam == "all" || listParam == "mates" || listParam == "enemies") {
        this.list$.next(listParam);
      } else {
        this.output.pushHelp("battle list");
      }
    } else {
      this.list$.next("all");
    }
  }
}
