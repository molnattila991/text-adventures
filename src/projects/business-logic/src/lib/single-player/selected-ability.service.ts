import { Injectable } from '@angular/core';
import { AbilityModel } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedAbilityService {
  private selected$: ReplaySubject<AbilityModel> = new ReplaySubject();

  constructor() { }

  selectAbility(ability: AbilityModel): void {
    this.selected$.next(ability);
  }

  getAbility(): Observable<AbilityModel>{
    return this.selected$.asObservable();
  }
}
