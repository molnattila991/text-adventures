import { GameMessage, MessageStatus, MessageType } from "../models-game/action-result.interface";

export function BattleStartedMessage() {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "A csata elkezdődött.",
        type: MessageType.information
    };
}

export function BattlePlayerSelectedMessage(name: string) {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "A most következő játékos: " + name,
        type: MessageType.information
    };
}

export function BattlePlayerVoteForContineMessage(name: string) {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "" + name + " engedélyezte a folytatást.",
        type: MessageType.information
    };
}

export function BattleFinishedRoundMessage(name: string) {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "" + name + " befejezte a kört.",
        type: MessageType.information
    };
}


export function BattlePlayerDeadMessage(name: string) {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "" + name + " meghalt.",
        type: MessageType.information
    };
}

export function BattlePlayerHasAlreadyVotedForContineMessage(name: string) {
    return <GameMessage>{
        status: MessageStatus.new,
        message: "" + name + " már engedélyezte a folytatást.",
        type: MessageType.error
    };
}

