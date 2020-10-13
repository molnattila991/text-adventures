import { Inject, Injectable } from '@angular/core';
import { EnumListService } from '@text-adventures/data-provider';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CommandManager, CommandOutputMessage, CommandOutputType, CommandOutputWrite, PropertyModel, UserCharacters } from '@text-adventures/shared';
import { Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class CommandManagerAttributeService implements CommandManager {
  private list$: Subject<string> = new Subject();
  private inspect$: Subject<string> = new Subject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.CommandOutputService) private output: CommandOutputWrite,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters,
    private enumListService: EnumListService
  ) {
    this.list$.pipe(
      withLatestFrom(
        this.characterService.getSelectedCharacter(),
        this.enumListService.propertyTypeList
      ),
      map(([list, character, properties]) =>
        Object.keys(character.attributes).map(key => {
          return {
            ...character.attributes[key],
            name: properties.find(p => p.id == character.attributes[key].type).text
          }
        })
      )
    ).subscribe(v => {
      const messages = [];
      v.forEach(attribute => {
        messages.push(<CommandOutputMessage>{ type: CommandOutputType.Attribute, id: attribute.type, message: attribute.name })
      })
      this.output.push(messages);
    });

    this.inspect$.pipe(
      withLatestFrom(
        this.characterService.getSelectedCharacter(),
        this.enumListService.propertyTypeList
      ),
      map(([inspect, character, properties]) => {
        inspect = inspect.toLocaleLowerCase().replace("-", " ");
        let attr = character.attributes[inspect];
        if (attr) {
          return [attr, inspect];
        } else {
          const prop = properties.find(p => p.text.toLocaleLowerCase() == inspect);
          if (prop) {
            attr = character.attributes[prop.id];
            return [attr, inspect];
          } else {
            return [undefined, inspect];
          }
        }
      })
    ).subscribe(([attr, param]) => {
      attr = <PropertyModel>attr;
      if (attr) {
        this.output.push([<CommandOutputMessage>{ type: CommandOutputType.Attribute, id: attr.type, message: JSON.stringify(attr) }]);
      } else {
        this.output.pushHelp("Tulajdonság (" + param + ") nem valós.");
      }
    });

  }
  handle(commandParts: string[]): void {
    let command = commandParts[1];

    if (command) {
      switch (command) {
        case "list":
          this.list$.next(command);
          break;
        case "inspect":
          this.inspect(commandParts);
          break;
        default:
          this.output.pushHelp("attributes");
          break;
      }
    } else {
      this.output.pushHelp("attributes");
    }

    this.output.flush();

  }

  private inspect(commandParts: string[]) {
    let listParam = commandParts[2];
    if (listParam) {
      this.inspect$.next(listParam);
    } else {
      this.output.pushHelp("attributes inspect");
    }
  }
}
