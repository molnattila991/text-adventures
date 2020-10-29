import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, RoomModel } from '@text-adventures/shared';
import { combineLatest, ReplaySubject, Observable, empty, from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { ISelectedItemService } from '../../../selected-item/selected-item-service';

@Injectable()
export class AppTypeService {
  private appIsHost$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>) {
    combineLatest([
      this.loggedInUser.getLoggedInUser(),
      this.selectedRoomService.getSelectedItem()
    ]).pipe(
      map(([user, room]) => room.hostPlayerID == user.id),
      distinctUntilChanged((a, b) => a == b),
    ).subscribe(this.appIsHost$);

  }

  public isHost(): Observable<boolean> {
    return this.appIsHost$.asObservable();
  }

  public ifHost(): Observable<void> {
    return this.appIsHost$.pipe(
      filter(h => h == true),
      switchMap(() => from(new Promise<void>(resolve => resolve())))
    );
  }
}
