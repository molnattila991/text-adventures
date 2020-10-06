import { CharacterModel } from "../character-model";

export enum TeamMemberType { Player, AI };

export interface TeamMemberModel {
    member: CharacterModel;
    type: TeamMemberType;
    playerID: number | string;
    /**Shows if character has already performed his action in this round. */
    roundIsEnded: boolean;
    voted: boolean;
    /**Shows if character still live */
    active: boolean;
}

export interface TeamModel {
    name: string;
    maxCount: number;
    actualCount: number;

    teamMembers: TeamMemberModel[];
}