import { Inject, Injectable } from '@angular/core';
import { BaseDataCollection, BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterItemModelExpanded, CommandManager, CommandOutputMessage, CommandOutputType, CommandOutputWrite, HashMap, ItemModel, STORE_INJECTION_TOKEN, UserCharacters } from '@text-adventures/shared';
import { Subject, ReplaySubject, combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandManagerInventoryService implements CommandManager {
  private list$: Subject<string> = new Subject();
  private inspect$: Subject<string> = new Subject();

  private usedItems$: ReplaySubject<CharacterItemModelExpanded[]> = new ReplaySubject();
  private items$: ReplaySubject<CharacterItemModelExpanded[]> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters,
  ) {
    this.characterService.getSelectedCharacter().subscribe(character => {
      const items = Object.keys(character.items).map(key => character.items[key]);
      const usedItems = Object.keys(character.inventory.items).map(key => character.items[key]);

      this.items$.next(items);
      this.usedItems$.next(usedItems);
    });

    this.list$.pipe(
      withLatestFrom(
        this.usedItems$,
        this.items$
      ),
      map(([parameter, usedItems, items]) => {
        if (parameter == "all") {
          return [
            ...usedItems.map(item => <CommandOutputMessage>{ type: CommandOutputType.ItemUsed, id: item.item.id, message: item.item.name }),
            ...items.map(item => <CommandOutputMessage>{ type: CommandOutputType.Item, id: item.item.id, message: item.item.name })
          ];
        } else if (parameter == "bag") {
          return items.map(item => <CommandOutputMessage>{ type: CommandOutputType.ItemUsed, id: item.item.id, message: item.item.name });
        }
        else if (parameter == "used") {
          return usedItems.map(item => <CommandOutputMessage>{ type: CommandOutputType.Item, id: item.item.id, message: item.item.name });;
        }
      })
    ).subscribe(messages => {
      this.output.push(messages);
    });

    this.inspect$.pipe(
      withLatestFrom(
        this.usedItems$,
        this.items$
      ),
      map(([param, usedItems, items]) => {
        param = param.toLocaleLowerCase().replace("-", " ");
        let item = items.find(i => i.item.id.toLocaleLowerCase() == param || i.item.name.toLocaleLowerCase() == param);
        if (item) {
          return [
            <CommandOutputMessage>{ type: CommandOutputType.Item, id: item.item.id, message: item.item.name },
            <CommandOutputMessage>{ type: CommandOutputType.Item, id: item.item.id, message: item.count + "" },
            <CommandOutputMessage>{ type: CommandOutputType.Item, id: item.item.id, message: JSON.stringify(item.item) }
          ];
        } else {
          item = usedItems.find(i => i.item.id.toLocaleLowerCase() == param || i.item.name.toLocaleLowerCase() == param);
          if (item) {
            return [
              <CommandOutputMessage>{ type: CommandOutputType.ItemUsed, id: item.item.id, message: item.item.name },
              <CommandOutputMessage>{ type: CommandOutputType.ItemUsed, id: item.item.id, message: item.count + "" },
              <CommandOutputMessage>{ type: CommandOutputType.ItemUsed, id: item.item.id, message: JSON.stringify(item.item) }
            ];
          } else {
            return [<CommandOutputMessage>{ message: "Eszköz (" + param + ") nem létezik." }];
          }
        }
      })
    ).subscribe(message => this.output.push(message));
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
          this.output.pushHelp("items");
          break;
      }
    } else {
      this.output.pushHelp("items");
    }
  }

  private inspect(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      this.inspect$.next(listParam);
    } else {
      this.output.pushHelp("items inspect");
    }
  }

  private list(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      if (listParam == "all" || listParam == "bag" || listParam == "used") {
        this.list$.next(listParam);
      } else {
        this.output.pushHelp("items list");
      }
    } else {
      this.list$.next("all");
    }
  }
}
