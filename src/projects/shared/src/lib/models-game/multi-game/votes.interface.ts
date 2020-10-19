export interface RoomVote {
    playerId: string;
    voted: boolean;
}

export interface RoomVotes {
    id: string;
    roomId: string;
    votes: RoomVote[];
}
