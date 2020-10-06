import { GameMessage } from "../action-result.interface";
import { TeamModel } from "./team-model.interface";

export enum RoomState {
    waitForPlayers, // Players can join to game only this point //Waiting in the room for incoming players 
    voteForStart, //players have to enable start the game
    waitForStartVote, //wait until all of the players made their vote
    waitForStart, //Host can now start the game
    started, //Game has been started by host
    selectPlayer, //If everything is fine, host's application select player, and if it is AI player than perform his actions
    waitForSelectedPlayerAction, //Selected player's turn
    waitForVote, //After a player has finished his turn, all players have to vote to continue
    ended //Game has been ended. Players forwarded to the summary page
}

export enum RoomUiPage {
    selectTarget,
    selectAbility,
    performAction,
    waitForAction,
    voteForContinue,
    waitOthersVote,

    room,
    voteForStart,
    log,
    summary,
    end
}

export interface RoomUiModel {
    actualPage: RoomUiPage;
}

export interface RoomTitleModel {
    id: string;
    roomId: string;
    name: string;
}

export interface RoomModel {
    id?: string;
    name: string;
    state: RoomState;
    maxTeamCount: number;
    actualTeamCount: number;
    teams: TeamModel[];
    messages: GameMessage[];
    hostPlayerID: string;
    actualPlayerPlayerID: string;
    actualVote: number; //Players have to vote to start next round.
    acutalRound: number;
    maxTeamMemberCount: number;
    actualPlayerCount: number;
    finishedPlayerCount: number;

}