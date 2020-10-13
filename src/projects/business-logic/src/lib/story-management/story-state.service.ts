import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export enum StoryState {
  InStory, BattleIntro, InBattle
}

@Injectable({
  providedIn: 'root'
})
export class StoryStateService {

  private storyState$: ReplaySubject<StoryState> = new ReplaySubject();
  constructor() { }

  setStoryState(state: StoryState): void {
    this.storyState$.next(state);
  }

  getStoryState(): Observable<StoryState> {
    return this.storyState$.asObservable();
  }
}
