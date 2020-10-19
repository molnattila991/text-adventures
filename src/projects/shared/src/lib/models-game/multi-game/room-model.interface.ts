import { TeamModel } from "./team-model.interface";

export interface RoomTitleModel {
    id: string;
    roomId: string;
    name: string;
}

export interface RoomModel {
    id?: string;
    name: string;
    teams: TeamModel[];
    hostPlayerID: string;
    currentPlayerID: string;
    teamSize: number;
    maxNumberOfTeams: number;
    numberOfRounds: number;
    numberOfTeams: number;
    numberOfPlayers: number;
    numberOfActivePlayers: number;
}