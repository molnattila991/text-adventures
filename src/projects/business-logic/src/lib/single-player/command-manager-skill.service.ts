import { Inject, Injectable } from '@angular/core';
import { CommandManager, BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, UserCharacters, STORE_INJECTION_TOKEN, BaseDataCollection, AbilityModel, AbilityType, CommandOutputMessage, HashMap, CommandOutputType } from '@text-adventures/shared';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandManagerSkillService implements CommandManager {
  private abilities$: ReplaySubject<AbilityModel[]> = new ReplaySubject();
  private selected$: ReplaySubject<AbilityModel> = new ReplaySubject();
  private list$: Subject<string> = new Subject();
  private inspect$: Subject<string> = new Subject();
  private select$: Subject<string> = new Subject();
  private active$: Subject<void> = new Subject();
  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters,
    @Inject(STORE_INJECTION_TOKEN.AbilityStoreService) private abilities: BaseDataCollection<AbilityModel>
  ) {
    combineLatest(
      [
        this.characterService.getSelectedCharacter().pipe(map(item => item.abilities)),
        this.abilities.getHash()
      ]).pipe(
        map(([abilities, hash]) => Object.keys(abilities).map(key => hash[abilities[key].abilityId]))
      )
      .subscribe(this.abilities$);

    this.listSkills();

    this.inspectSkill();

    this.selectSkill();

    this.activeSkill();
  }

  private activeSkill() {
    this.active$.pipe(
      withLatestFrom(this.selected$)
    ).subscribe(([active, ability]) => {
      if (ability) {
        this.output.push([<CommandOutputMessage>{ id: ability.id, type: CommandOutputType.SkillUsed, message: "Aktív képesség: " + ability.name }]);
      } else {
        this.output.pushText(["Nincs aktív képesség."]);
      }
    });
  }

  private selectSkill() {
    this.select$.pipe(
      withLatestFrom(
        this.abilities.getHash(),
        this.abilities$
      ),
      map(([actionParam, hash, list]) => [this.convertToAbility(actionParam, hash, list), actionParam])
    ).subscribe(([ability, param]) => {
      if (ability) {
        const a = <AbilityModel>ability;
        this.output.push([<CommandOutputMessage>{ id: a.id, type: CommandOutputType.SkillUsed, message: "Képesség kiválasztva: " + a.name }]);
        this.selected$.next(a);
      } else {
        this.output.pushText(["Képesség (" + param + ") nem létezik."]);
      }
    });
  }

  private inspectSkill() {
    this.inspect$.pipe(
      withLatestFrom(
        this.abilities.getHash(),
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
    });
  }

  private listSkills() {
    this.list$.pipe(
      withLatestFrom(this.abilities$),
      map(([action, list]) => list.filter(item => {
        if (action == "all")
          return true;
        if (action == "magical")
          return item.abilityType == AbilityType.Magical;
        if (action == "physical")
          return item.abilityType == AbilityType.Physical;
      })
      )
    ).subscribe(list => {
      list.forEach(ability => {
        this.output.push([<CommandOutputMessage>{ id: ability.id, message: ability.name }]);
      });
    });
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
        case "select":
          this.select(commandParts);
          break;
        case "active":
          this.active$.next();
          break;
        default:
          this.output.pushHelp("skills");
          break;
      }
    } else {
      this.output.pushHelp("skills");
    }
  }

  private select(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      this.select$.next(listParam);
    } else {
      this.output.pushHelp("skills select");
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
