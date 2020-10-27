import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, DATA_PROVIDER_INJECTION_TOKEN, IGenericCrudDataProvider, RoomModel, RoomVote, RoomVotes, UserHandling, UserModel } from '@text-adventures/shared';
import { filter, first, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ReplaySubject, Observable, of } from 'rxjs';
import { ISelectedItemService } from '@text-adventures/business-logic';

export interface MultiTeamStatus {
  membersNumber: number;
  votes: number;
}

@Injectable()
export class SelectedRoomVotesService {
  private selectedVotes$: ReplaySubject<RoomVotes> = new ReplaySubject();
  private status$: ReplaySubject<MultiTeamStatus> = new ReplaySubject();
  constructor(
    @Inject(DATA_PROVIDER_INJECTION_TOKEN.RoomVotesDataProviderService) protected dataProvider: IGenericCrudDataProvider<RoomVotes>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>

  ) {
    this.selectedRoomService.getSelectedItem()
      .pipe(
        switchMap(item => this.dataProvider.getFiltered("roomId", item.id, "=="))
      ).subscribe(item => {
        if (item.length > 0) {
          const selectedItem = item[0].model;
          selectedItem && this.selectedVotes$.next(selectedItem);
        }
      });

    this.selectedVotes$
      .pipe(
        withLatestFrom(this.selectedRoomService.getSelectedItem()),
        map(([votes, room]) => {
          const membersNumber = room.teams
            .map(t => t.teamMembers.length)
            .reduce((sum, current) => sum + current, 0);
          return <MultiTeamStatus>{
            membersNumber,
            votes: votes.votes.length
          };
        })
      ).subscribe(this.status$);
  }

  getSelectedItem(): Observable<RoomVotes> {
    return this.selectedVotes$.asObservable();
  }

  vote(): void {
    this.loggedInUser.getLoggedInUser()
      .pipe(
        withLatestFrom(this.selectedVotes$),
        first(),
        map(vote),
        filter(v => v != undefined)
      ).subscribe(votes => this.dataProvider.update(votes.id, votes));
  }

  getStatus(): Observable<MultiTeamStatus> {
    return this.status$.asObservable();
  }

  resetVotes(): void {
    this.selectedVotes$.pipe(take(1)).subscribe(votesObject => {
      votesObject.votes = [];
      this.dataProvider.update(votesObject.id, votesObject);
    })
  }
}

const vote = ([user, votes]: [UserModel, RoomVotes]) => {
  const userVoteIndex = votes.votes.findIndex(i => i.playerId == user.id);
  if (userVoteIndex == -1) {
    votes.votes.push(<RoomVote>{
      playerId: user.id,
      voted: true
    });

    return votes;
  }
}
