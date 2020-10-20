import { Inject, Injectable } from '@angular/core';
import { RoomModel, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, TeamMemberModel, BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, UserCharacters } from '@text-adventures/shared';
import { SelectedItemService } from '../../selected-item/selected-item-service';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

export interface SelectedRoomManagement {
  join(teamName: string): void;
  exit(teamName: string): void;
}

@Injectable()
export class SelectedRoomService extends SelectedItemService<RoomModel> implements SelectedRoomManagement {
  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) protected dataProvider: IGenericCrudDataProvider<RoomModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.UserCharactersService) private characterService: UserCharacters
  ) {
    super(dataProvider);
  }

  join(teamName: string): void {
    of(teamName)
      .pipe(
        withLatestFrom(
          this.getSelectedItem(),
          this.loggedInUser.getLoggedInUser().pipe(map(user => user.id)),
          this.characterService.getSelectedCharacter().pipe(map(character => character.id))
        ),
        map(joinToRoom)
      ).subscribe(room => this.dataProvider.update(room.id, room));
  }

  exit(teamName: string): void {
    of(teamName)
      .pipe(
        withLatestFrom(
          this.getSelectedItem(),
          this.loggedInUser.getLoggedInUser().pipe(map(user => user.id)),
        ),
        map(exitRoom)
      ).subscribe(room => this.dataProvider.update(room.id, room));
  }
}

export const joinToRoom = ([teamName, room, playerId, characterId]: [string, RoomModel, string, string]): RoomModel => {
  const team = room.teams.find(t => t.name == teamName);
  if (team) {
    team.teamMembers.push(<TeamMemberModel>{
      active: true,
      characterId: characterId,
      playerID: playerId
    });
    team.numberOfMembers = team.teamMembers.length;
  }

  return room;
}


export const exitRoom = ([teamName, room, playerId]: [string, RoomModel, string]): RoomModel => {
  const team = room.teams.find(t => t.name == teamName);
  if (team) {
    const member = team.teamMembers.findIndex(m => m.playerID == playerId);
    if (member != -1) {
      team.teamMembers.splice(member, 1);
      team.numberOfMembers = team.teamMembers.length;
    }
  }
  return room;
}