
export interface IBattleManagerService {
    startVoteForStart(); //waitForPlayers
    startGame(); //voteForStart
    selectNextPlayer(): string; //selectPlayer
    startPlayerRound(); //waitForSelectedPlayerAction
    closePlayerRound(); //waitForVote
    startVoteForContinue(); //waitForVote => selectPlayer

    playerIsActualPlayer(name: string);
    playerIsAI(name: string);
    playerIsHost(name: string): boolean;

}