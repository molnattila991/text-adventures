import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, RoomModel, TeamMemberModel } from '@text-adventures/shared';
import { ISelectedItemService } from '@text-adventures/business-logic';
import { distinctUntilChanged, filter, map, pairwise, tap } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { SelectedCharactersService } from './selected-characters.service';

@Injectable()
export class CharactersInRoomService {
  private allMembers$: ReplaySubject<TeamMemberModel[]> = new ReplaySubject();
  private activeTeamCount$: ReplaySubject<number> = new ReplaySubject();
  private activePlayers$: ReplaySubject<string[]> = new ReplaySubject();

  constructor(
    private selectedCharacters: SelectedCharactersService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoom: ISelectedItemService<RoomModel>
  ) {
    this.selectedRoom.getSelectedItem()
      .pipe(
        map(flatTeams),
        distinctUntilChanged((a, b) => JSON.stringify(alert) == JSON.stringify(b))
      )
      .subscribe(this.allMembers$)

    this.allMembers$.pipe(
      map(members => members.map(m => m.characterId)),
    ).subscribe(members => this.selectedCharacters.select(members));

    this.selectedRoom.getSelectedItem().pipe(
      map(teams => teams.teams.filter(members => members.teamMembers.filter(m => m.active).length > 0).length)
    ).subscribe(this.activeTeamCount$);

    this.allMembers$
      .pipe(
        map(players => players
          .filter(p => p.active == true)
          .map(p => p.playerID)),
      )
      .subscribe(this.activePlayers$);
  }

  getActivePlayers(): Observable<string[]> {
    return this.activePlayers$.asObservable();
  }

  getActivePlayersNumber(): Observable<number> {
    return this.activePlayers$.pipe(map(players => players.length));
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
