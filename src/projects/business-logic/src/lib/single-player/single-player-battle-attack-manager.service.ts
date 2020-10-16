import { Inject, Injectable } from '@angular/core';
import { SinglePlayerBattlePlayerManagerService } from './single-player-battle-player-manager.service';
import { BattleService } from '../story-management/battle.service';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, UserCharacters, PropertyType } from '@text-adventures/shared';
import { withLatestFrom } from 'rxjs/operators';
import { SinglePlayerBattleTeamManagerService } from './single-player-battle-team-manager.service';

@Injectable()
export class SinglePlayerBattleAttackManagerService {

  constructor(
    private singlePlayerBattlePlayerManagerService: SinglePlayerBattlePlayerManagerService,
    private singlePlayerBattleTeamManagerService: SinglePlayerBattleTeamManagerService,
    private battleService: BattleService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private userCharactersService: UserCharacters,

  ) {
    this.singlePlayerBattlePlayerManagerService.getCurrentPlayer()
      .pipe(withLatestFrom(
        this.singlePlayerBattlePlayerManagerService.getActivePlayers(),
        this.userCharactersService.getSelectedCharacter()
      )).subscribe(([currentPlayer, activePlayers, selectedPlayerCharacter]) => {
        const autoPlayers = activePlayers.filter(p => p.autoPlayer && p.index != currentPlayer.index);

        autoPlayers.forEach(a => {
          this.singlePlayerBattleTeamManagerService.vote(a.index);
        })

        if (currentPlayer.id == selectedPlayerCharacter.id) {
          this.output.pushText(["Válassz célpontot és képességet amivel támadni szeretnél."]);
        } else {
          this.output.pushText(["Jelezd, ha készen vagy."]);
          //célpont keresés
          //képesség kiválasztás
          const target = activePlayers.find(a => a.id == selectedPlayerCharacter.id);
          const ability = Object.values(currentPlayer.abilities)[Math.floor(Math.random() * Object.keys(currentPlayer.abilities).length)]

          if (target && ability) {
            //támadás

            target.attributes[PropertyType.actLife].value -= ability.ability.properties.find(p => p.type == PropertyType.damage).value;
            this.battleService.updateCharacter(target);
            //kör befejezése

            this.singlePlayerBattleTeamManagerService.vote(currentPlayer.index);
          }

          this.output.pushText(["Az ellenfél befejezte a kört."]);
        }
      })
  }
}
