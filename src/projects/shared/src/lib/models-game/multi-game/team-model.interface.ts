export interface TeamMemberModel {
    characterId: string;
    playerID: number | string;
    active: boolean;
}

export interface TeamModel {
    name: string;
    maxNumberOfMembers: number;
    numberOfMembers: number;
    teamMembers: TeamMemberModel[];
}