import { Observable } from "rxjs";
import { RoomModel } from '../../models-game/battle/room-model.interface';
import { TeamModel } from '../../models-game/battle/team-model.interface';
import { CharacterModel } from '../../models-game/character-model';

export interface IRoomService {
    createAndAddTeam(teamModel: TeamModel);
    deleteTeam(teamName: string);
    addPlayerToTeam(teamModel: TeamModel, player: CharacterModel);
    syncRoom(roomID: number | string): Observable<RoomModel>;
    pushRoom(roomModel: RoomModel);
    clearVotes();
}