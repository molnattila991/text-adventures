import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterModelExpanded, CommandManager, CommandOutputMessage, CommandOutputType, CommandOutputWrite, UserCharacters } from '@text-adventures/shared';
import { BattleService, BattleTeam } from '../story-management/battle.service';
import { Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { SinglePlayerBattleTeamManagerService } from './single-player-battle-team-manager.service';
import { SelectedTargetService } from './selected-target.service';
import { SinglePlayerBattleAttackManagerService } from './single-player-battle-attack-manager.service';
import { StoryState, StoryStateService } from '../story-management/story-state.service';


@Injectable()
export class CommandManagerBattleService implements CommandManager {

  private list$: Subject<string> = new Subject();
  private target$: Subject<string> = new Subject();

  constructor(
    private battleService: BattleService,
    private singlePlayerBattleTeamManagerService: SinglePlayerBattleTeamManagerService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private userCharactersService: UserCharacters,
    private selectedTargetService: SelectedTargetService,
    private singlePlayerBattleAttackManagerService: SinglePlayerBattleAttackManagerService,
    private storyStateService: StoryStateService

  ) {
    this.listSubscription();
    this.targetSubscription();
  }

  handle(commandParts: string[]): void {
    let command = commandParts[1];

    if (command) {
      switch (command) {
        case "start":
          this.singlePlayerBattleTeamManagerService.startBattle();
          this.output.flush();
          break;
        case "list":
          this.list(commandParts);
          this.output.flush();
          break;
        case "inspect":
          break;
        case "target":
          this.target(commandParts);
          this.output.flush();
          break;
        case "attack":
          this.singlePlayerBattleAttackManagerService.attackWithPlayer();
          this.output.flush();
          break;
        case "vote":
          this.singlePlayerBattleTeamManagerService.voteWithPlayer();
          this.output.flush();
          break;
        case "end":
          this.storyStateService.setStoryState(StoryState.WinBattle);
          break;
        default:
          this.output.pushHelp("battle");
          this.output.flush();
          break;
      }
    } else {
      this.output.pushHelp("battle");
      this.output.flush();
    }


  }

  private targetSubscription() {
    this.target$.pipe(
      withLatestFrom(
        this.battleService.getTeams()
      ),
      map(([target, teams]) => {
        const id = target;
        const name = target.toLocaleLowerCase().replace("-", " ");
        let selected: CharacterModelExpanded;
        teams.forEach(t => {
          selected = t.teamMembers.find(member => member.name.toLocaleLowerCase() == name || member.id == id);
        });
        return selected;
      })
    ).subscribe(target => {
      if (target) {
        this.output.push([<CommandOutputMessage>{ type: CommandOutputType.Character, id: target.id, message: "Kiválasztott karakter: " + target.name }]);
        this.output.push([<CommandOutputMessage>{ type: CommandOutputType.Character, id: target.id, message: JSON.stringify(target) }]);
        this.selectedTargetService.selectTarget(target);
      } else {
        this.output.pushHelp("A kiválasztott célpont nem valós.");
        this.output.pushHelp("battle target")
      }
    })
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
          this.output.push([<CommandOutputMessage>{ id: member.index, type: CommandOutputType.Character, message: "Karakter: " + member.name }]);
        })
      })
    });
  }

  private target(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      this.target$.next(listParam);
    } else {
      this.output.pushHelp("battle target");
    }
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
