import { Inject, Injectable } from '@angular/core';
import { CommandManager, BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, UserCharacters, ItemModel, STORE_INJECTION_TOKEN, BaseDataCollection, AbilityModel, AbilityType, CommandOutputMessage, HashMap } from '@text-adventures/shared';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandManagerSkillService implements CommandManager {
  private abilities$: ReplaySubject<AbilityModel[]> = new ReplaySubject();
  private list$: Subject<string> = new Subject();
  private inspect$: Subject<string> = new Subject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters,
    @Inject(STORE_INJECTION_TOKEN.AbilityStoreService) private items: BaseDataCollection<AbilityModel>
  ) {
    combineLatest(
      [
        this.characterService.getSelectedCharacter().pipe(map(item => item.abilities)),
        this.items.getHash()
      ]).pipe(
        map(([abilities, hash]) => Object.keys(abilities).map(key => hash[abilities[key].abilityId]))
      )
      .subscribe(this.abilities$);

    this.list$.pipe(
      withLatestFrom(this.abilities$),
      map(([action, list]) => list.filter(item => {
        if (action == "all")
          return true;
        if (action == "magical")
          return item.abilityType == AbilityType.Magical
        if (action == "physical")
          return item.abilityType == AbilityType.Physical
      })
      )
    ).subscribe(list => {
      list.forEach(ability => {
        this.output.push([<CommandOutputMessage>{ id: ability.id, message: ability.name }]);
      })
    });

    this.inspect$.pipe(
      withLatestFrom(
        this.items.getHash(),
        this.abilities$
      ),
      map(([actionParam, hash, list]) => [this.convertToAbility(actionParam, hash, list), actionParam])
    ).subscribe(([ability, param]) => {
      if (ability) {
        const a = <AbilityModel>ability;
        this.output.push([<CommandOutputMessage>{ id: a.id, message: JSON.stringify(a) }]);
      } else {
        this.output.pushText(["Képesség (" + param + ") nem létezik."]);
      }
    })
  }

  handle(commandParts: string[]): void {
    let command = commandParts[1];

    if (command) {
      switch (command) {
        case "list":
          this.list(commandParts);
          break;
        case "inspect":
          this.inspect(commandParts);
          break;
        default:
          this.output.pushHelp("skills");
          break;
      }
    } else {
      this.output.pushHelp("skills");
    }
  }

  private inspect(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      this.inspect$.next(listParam);
    } else {
      this.output.pushHelp("skills inspect");
    }
  }

  private list(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      if (listParam == "all" || listParam == "physical" || listParam == "magical") {
        this.list$.next(listParam);
      } else {
        this.output.pushHelp("skills list");
      }
    } else {
      this.list$.next("all");
    }
    return listParam;
  }

  private convertToAbility(actionParam: string, hash: HashMap<AbilityModel>, list: AbilityModel[]): AbilityModel {
    let item = hash[actionParam];
    if (item) {
      return item;
    } else {
      actionParam = actionParam.toLocaleLowerCase().replace('-', ' ');
      item = list.find(i => i.name.toLocaleLowerCase() == actionParam.toLocaleLowerCase().replace('-', ' '));
      if (item) {
        return item;
      } else {
        return undefined;
      }
    }
  }
}
