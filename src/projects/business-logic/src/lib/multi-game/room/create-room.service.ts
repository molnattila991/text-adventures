import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomModel, RoomTitleModel, TeamModel, UserCharacters, UserHandling } from '@text-adventures/shared';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

export interface CreateRoom {
  createRoom(name: string): void;
}

@Injectable()
export class CreateRoomService implements CreateRoom {

  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsDataProviderService) private roomsDataProvider: IGenericCrudDataProvider<RoomModel>,
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomsTitleDataProviderService) private roomsTitleDataProvider: IGenericCrudDataProvider<RoomTitleModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private user: UserHandling
  ) { }

  createRoom(name: string): void {
    of(name).pipe(
      withLatestFrom(
        this.user.getLoggedInUser()
      ),
      map(([roomName, user]) => {
        return <RoomModel>{
          name: roomName,
          currentPlayerID: user.id,
          hostPlayerID: "",
          maxNumberOfTeams: 2,
          numberOfActivePlayers: 0,
          numberOfPlayers: 0,
          numberOfRounds: 0,
          numberOfTeams: 2,
          teamSize: 4,
          teams: [
            <TeamModel>{
              maxNumberOfMembers: 4,
              name: "Sötét oldal",
              numberOfMembers: 0,
              teamMembers: []
            },
            <TeamModel>{
              maxNumberOfMembers: 4,
              name: "Világos oldal",
              numberOfMembers: 0,
              teamMembers: []
            }
          ]
        }
      })
    ).subscribe(room => {
      this.roomsDataProvider.add(room).then(room => {
        this.roomsTitleDataProvider.add(<RoomTitleModel>{
          name: room.name,
          roomId: room.id
        })
      })
    })
  }
}
