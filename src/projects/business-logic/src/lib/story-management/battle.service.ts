import { Injectable } from '@angular/core';
import { CharacterModelExpanded, CharacterPlayerModelExpanded } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';

export interface BattleTeam {
  teamName: string;
  teamIndex: number;
  teamMembers: CharacterModelExpanded[] | CharacterPlayerModelExpanded[];
}

@Injectable()
export class BattleService {

  private teams$: ReplaySubject<BattleTeam[]> = new ReplaySubject();

  constructor() {

  }

  refresh(teams: BattleTeam[]) {
    this.teams$.next(teams);
  }

  getTeams(): Observable<BattleTeam[]> {
    return this.teams$.asObservable();
  }
}
