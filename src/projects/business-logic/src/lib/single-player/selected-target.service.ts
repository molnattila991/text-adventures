import { Injectable } from '@angular/core';
import { CharacterModelExpanded } from '@text-adventures/shared';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedTargetService {
  private targetedCharacter$: ReplaySubject<CharacterModelExpanded> = new ReplaySubject();

  constructor() { }

  selectTarget(character: CharacterModelExpanded): void {
    this.targetedCharacter$.next(character);
  }

  getTarget(): Observable<CharacterModelExpanded> {
    return this.targetedCharacter$.asObservable();
  }
}
