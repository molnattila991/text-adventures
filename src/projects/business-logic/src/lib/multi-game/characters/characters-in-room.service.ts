import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, RoomModel, TeamMemberModel } from '@text-adventures/shared';
import { ISelectedItemService } from '@text-adventures/business-logic';
import { filter, map, pairwise } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { SelectedCharactersService } from './selected-characters.service';

@Injectable()
export class CharactersInRoomService {
  private allMembers$: ReplaySubject<TeamMemberModel[]> = new ReplaySubject();
  private activeTeamCount$: ReplaySubject<number> = new ReplaySubject();
  constructor(
    private selectedCharacters: SelectedCharactersService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoom: ISelectedItemService<RoomModel>
  ) {
    this.selectedRoom.getSelectedItem().pipe(
      map(flatTeams),
      pairwise(),
      filter(([prev, curr]) => JSON.stringify(prev) != JSON.stringify(curr)),
      map(([prev, curr]) => curr)
    ).subscribe(this.allMembers$);

    this.allMembers$.pipe(
      map(members => members.map(m => m.characterId)),
    ).subscribe(members => this.selectedCharacters.select(members));

    this.selectedRoom.getSelectedItem().pipe(
      map(teams => teams.teams.filter(members => members.teamMembers.filter(m => m.active).length > 0).length)
    ).subscribe(this.activeTeamCount$);
  }

  getActiveTeamsCount(): Observable<number> {
    return this.activeTeamCount$.asObservable();
  }

  getPlayers(): Observable<TeamMemberModel[]> {
    return this.allMembers$.asObservable();
  }
}

const flatTeams = (room: RoomModel) => {
  return room.teams
    .map(team => team.teamMembers)
    .reduce((acc, val) => acc.concat(val), []);
}
