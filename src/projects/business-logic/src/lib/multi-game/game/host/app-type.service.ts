import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, UserHandling, RoomModel } from '@text-adventures/shared';
import { combineLatest, ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      map(([user, room]) => room.hostPlayerID == user.id)
    ).subscribe(this.appIsHost$);

  }

  public isHost(): Observable<boolean> {
    return this.appIsHost$.asObservable();
  }
}
