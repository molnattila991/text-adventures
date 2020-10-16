import { Inject, Injectable } from '@angular/core';
import { AbilityModel, BaseDataCollection, BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterModel, CharacterModelExpanded, CharacterPlayerModelExpanded, ItemModel, STORE_INJECTION_TOKEN, UserCharacters } from '@text-adventures/shared';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { SinglePlayerBattlePlayerManagerService } from '../single-player/single-player-battle-player-manager.service';

export interface BattleTeam {
  teamName: string;
  teamIndex: number;
  teamMembers: CharacterModelExpanded[];
}

@Injectable()
export class BattleService {

  private teams$: ReplaySubject<BattleTeam[]> = new ReplaySubject();
  private createTeams$: Subject<string[]> = new Subject();
  private updateCharacter$: Subject<CharacterModelExpanded> = new Subject();
  constructor(
    @Inject(STORE_INJECTION_TOKEN.AbilityStoreService) private abilities: BaseDataCollection<AbilityModel>,
    @Inject(STORE_INJECTION_TOKEN.ItemStoreService) private items: BaseDataCollection<ItemModel>,
    @Inject(STORE_INJECTION_TOKEN.CharacterStoreService) private characters: BaseDataCollection<CharacterModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters,
  ) {
    this.createTeams$.pipe(
      filter(t => t && t.length > 0),
      withLatestFrom(
        this.characters.getHash(),
        this.items.getHash(),
        this.abilities.getHash(),
        this.characterService.getSelectedCharacter()
      ),
      map(([create, characters, items, abilibiesHash, player]) => {
        let playerIndex = 0;

        player.index = playerIndex++;
        player.autoPlayer = false;

        const enemies = create.map(id => {
          const original = characters[id];
          const character: CharacterModelExpanded = JSON.parse(JSON.stringify(original));
          character.index = playerIndex++;
          character.autoPlayer = true;

          if (original.abilities == undefined)
            original.abilities = {};
          Object.keys(original.abilities).forEach(key => {
            character.abilities[key].ability = abilibiesHash[key];
          });

          if (original.items == undefined)
            original.items = {};
          Object.keys(original.items).forEach(key => {
            character.items[key].item = items[key];
          });

          if (original.inventory == undefined)
            original.inventory = {};
          if (original.inventory.items == undefined)
            original.inventory.items = {};
          Object.keys(original.inventory.items).forEach(key => {
            character.inventory.items[key].item = items[key];
          });

          return character;
        });

        const teams: BattleTeam[] = [];
        teams.push(<BattleTeam>{ teamName: "Szövetségesek", teamIndex: 0, teamMembers: [player] });
        teams.push(<BattleTeam>{ teamName: "Ellenségek", teamIndex: 1, teamMembers: enemies });

        return teams;
      })
    ).subscribe(this.teams$);

    this.updateCharacter$
      .pipe(withLatestFrom(this.teams$))
      .subscribe(([updateCharacter, teams]) => {
        teams.forEach(team => {
          const itemToUpdate = team.teamMembers.findIndex(m => m.index == updateCharacter.index);
          if (itemToUpdate != -1) {
            team[itemToUpdate] = updateCharacter;
          }
        });
        this.teams$.next(<BattleTeam[]>JSON.parse(JSON.stringify(teams)));
      });
  }

  createBattleTeams(enemies: string[]) {
    this.createTeams$.next(enemies);
  }

  getTeams(): Observable<BattleTeam[]> {
    return this.teams$.asObservable();
  }

  updateCharacter(character: CharacterModelExpanded): void {
    this.updateCharacter$.next(character);
  }
}
