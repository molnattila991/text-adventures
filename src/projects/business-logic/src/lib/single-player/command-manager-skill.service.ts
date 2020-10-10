import { Inject, Injectable } from '@angular/core';
import { CommandManager, BUSSINESS_LOGIC_INJECTION_TOKEN, CommandOutputWrite, UserCharacters, ItemModel, STORE_INJECTION_TOKEN, BaseDataCollection, AbilityModel, AbilityType, CommandOutputMessage } from '@text-adventures/shared';
import { Observable, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandManagerSkillService implements CommandManager {
  private abilities$: ReplaySubject<AbilityModel[]> = new ReplaySubject();
  private list$: Subject<string> = new ReplaySubject();
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
        this.output.push([<CommandOutputMessage>{ id: ability.name, message: ability.name }]);
      })
    });

  }

  handle(commandParts: string[]): void {
    if (commandParts[1]) {
      switch (commandParts[1]) {
        case "list":
          const listParam = commandParts[2];
          if (listParam) {
            if (listParam == "all" || listParam == "physical" || listParam == "magical") {
              this.list$.next(listParam);
            } else {
              this.output.pushHelp("skills list");
            }
          } else {
            this.list$.next("all");
          }
          break;
        default:
          this.output.pushHelp("skills");
          break;
      }
    } else {
      this.output.pushHelp("skills");
    }
  }
}
