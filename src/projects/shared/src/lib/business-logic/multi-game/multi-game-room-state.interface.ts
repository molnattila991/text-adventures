import { MultiGameState } from './multi-game-state.enum';
export interface MultiGameRoomState {
    id?: string;
    roomId: string;
    state: MultiGameState;
    round: number;
    turn: number;
}