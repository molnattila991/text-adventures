import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterPlayerModel, RoomModel, TeamMemberModel } from '@text-adventures/shared';
import { ISelectedItemService, ISelectedItemsService } from '@text-adventures/business-logic';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class CharactersInRoomService {
  private allMembers$: ReplaySubject<TeamMemberModel[]> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedCharactersService) private selectedCharacters: ISelectedItemsService<CharacterPlayerModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoom: ISelectedItemService<RoomModel>
  ) {
    this.selectedRoom.getSelectedItem().pipe(
      map(flatTeams)
    ).subscribe(this.allMembers$);

    this.allMembers$
      .pipe(map(members => members.map(m => m.characterId)))
      .subscribe(members => this.selectedCharacters.select(members))
  }
}

export const flatTeams = (room: RoomModel) => {
  return room.teams
    .map(team => team.teamMembers)
    .reduce((acc, val) => acc.concat(val), []);
}
