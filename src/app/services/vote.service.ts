import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { VoteReward } from "../models/VoteModel";

@Injectable({
    providedIn: 'root'
  })
export class VoteService{

    constructor(private apiService : ApiService){}

    getServerRanking(){
        return this.apiService.get("vote/server-ranking?limit=10")
    }

    getVoteRewards(){
        return this.apiService.get("vote/rewards")
    }

    updateVoteRewards(rewards : VoteReward[]){
        return this.apiService.post("vote/update-rewards",rewards)
    }

    updateUserRanking(username : string){
        return this.apiService.get(`vote/user-ranking?username=${username}`)
    }

    updateUserVoteStatus(username : string){
        return this.apiService.get(`vote/status?username=${username}`)
    }

    tryVote(voteWebSite : number, username : string){
        return this.apiService.get(`vote/${voteWebSite}?username=${username}`)
    }

    getMonthVotes(date : Date,pageSize: number, pageNumber: number){
        return this.apiService.getPaged('vote/month',pageSize,pageNumber,null,date.toISOString())
    }

    getTotalVotes(pageSize: number, pageNumber: number){
        return this.apiService.getPaged('vote/total',pageSize,pageNumber,null,null)
    }
}