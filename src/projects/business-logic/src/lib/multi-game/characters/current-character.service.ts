import { Inject, Injectable } from '@angular/core';
import { BUSSINESS_LOGIC_INJECTION_TOKEN, CharacterPlayerModel, RoomModel, TeamMemberModel, UserHandling } from '@text-adventures/shared';
import { ISelectedItemService } from '../../selected-item/selected-item-service';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { CharactersInRoomService } from './characters-in-room.service';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { SelectedCharactersService } from './selected-characters.service';

@Injectable()
export class CurrentCharacterService {
  private currentPlayer$: ReplaySubject<TeamMemberModel> = new ReplaySubject();
  private currentCharacter$: ReplaySubject<CharacterPlayerModel> = new ReplaySubject();
  private currentPlayerIsLoggedInPlayer$: ReplaySubject<boolean> = new ReplaySubject();
  constructor(
    private charactersInRoom: CharactersInRoomService,
    private selectedCharacters: SelectedCharactersService,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.SelectedRoomService) private selectedRoomService: ISelectedItemService<RoomModel>,
    @Inject(BUSSINESS_LOGIC_INJECTION_TOKEN.LoginUserService) private loggedInUser: UserHandling,

  ) {
    combineLatest([
      this.selectedRoomService.getSelectedItem(),
      this.charactersInRoom.getPlayers(),
    ]).pipe(
      map(([room, players]) => players.find(p => p.playerID == room.currentPlayerID))
    ).subscribe(this.currentPlayer$);

    this.currentPlayer$.pipe(
      filter(p => p != undefined),
      withLatestFrom(this.selectedCharacters.getSelectedItemsHash()),
      map(([currentPlayer, characters]) => characters[currentPlayer.characterId])
    ).subscribe(this.currentCharacter$);

    this.currentPlayer$.pipe(
      filter(player => player != undefined),
      withLatestFrom(this.loggedInUser.getLoggedInUser()),
      map(([player, loggedInPlayer]) => player.playerID == loggedInPlayer.id),
    ).subscribe(this.currentPlayerIsLoggedInPlayer$)
  }

  getCharacter(): Observable<CharacterPlayerModel> {
    return this.currentCharacter$.asObservable();
  }

  isCurrentPlayerLoggedInPlayer(): Observable<boolean> {
    return this.currentPlayerIsLoggedInPlayer$.asObservable();
  }
}
