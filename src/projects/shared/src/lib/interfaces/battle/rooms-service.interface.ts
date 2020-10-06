import { RoomModel } from "../../models-game/battle/room-model.interface";
import { Observable } from "rxjs";
import { HashMap } from "../../models-be-connector/hash-map.interface";

export interface IRoomsService {
    createRoom(roomModel: RoomModel);
    deleteRoom(roomID: number | string);
    syncRooms(): Observable<HashMap<RoomModel>>
}