import { Injectable } from '@angular/core';
import { CharacterModel, CharacterPlayerModel } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';

export interface BattleTeam {
  teamName: string;
  teamIndex: number;
  teamMembers: CharacterModel[] | CharacterPlayerModel[];
}

@Injectable()
export class BattleService {

  private teams$: ReplaySubject<BattleTeam[]> = new ReplaySubject();

  constructor() {

  }

  getTeams(): Observable<BattleTeam[]> {
    return this.teams$.asObservable();
  }
}
