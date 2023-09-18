export class VoteStatusDto {
    timeLeft: number;


    constructor() {
        this.timeLeft = 0
    }

    get isReady(): boolean {
        return this.timeLeft === 0 ? true : false;
    }
}

export enum VoteWebSite {
    Serveur_Prive = 10,
    ServeursMinecraft = 20,
    Top_Serveurs = 30
}

export class RankingResult{
    monthlyTop: UserVoteNumber[] = []
    totalTop: UserVoteNumber[] = []

    constructor(){
    }
}

export class UserVoteNumber{
    username!: string;
    monthlyVotes!: number;
    totalVotes!: number;
    monthlyPosition!: number;
    totalPosition!: number;
    
    constructor(){}
}

export class VoteReward{
    position!: string;
    reward!: number;

    constructor(){}
}