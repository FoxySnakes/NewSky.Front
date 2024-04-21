import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { PaginationResult } from 'src/app/models/FilterModel';
import { UserVoteNumber, VoteReward } from 'src/app/models/VoteModel';
import { VoteService } from 'src/app/services/vote.service';
import { formatDate, registerLocaleData } from '@angular/common'
import localeFr from '@angular/common/locales/fr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-votelist',
  templateUrl: './votelist.component.html',
  styleUrls: ['./votelist.component.scss']
})
export class VotelistComponent implements OnInit{
  monthVotesPagined : PaginationResult<UserVoteNumber> = new PaginationResult<UserVoteNumber>(0,[],[],1,10)
  totalVotesPagined : PaginationResult<UserVoteNumber> = new PaginationResult<UserVoteNumber>(0,[],[],1,10)

  voteRewardsForm : FormGroup = new FormGroup({})
  voteRewardsControlName : string[] = [];

  votesRewardDictionnary : { [position: string]: any } = {};

  voteRewardsChange = false;

  loadingRewards = false;
  loadingMonth = false;
  loadingTotal = false


  date : Date = new Date(Date.now())

  constructor(private voteService : VoteService,
            private notifyService : NotifierService,
            private formBuilder: FormBuilder) {
              registerLocaleData(localeFr);
            }

  ngOnInit(): void {
    this.UpdateMonthRanking()
    this.UpdateTotalRanking()

    this.loadingRewards = true
    this.voteService.getVoteRewards().subscribe({
      next: (rewards : VoteReward[]) => {
        rewards.forEach(reward => {
          this.voteRewardsForm.addControl(`position${reward.position}`, new FormControl(reward.reward))
          this.voteRewardsControlName.push(`position${reward.position}`)
        })

        this.voteRewardsForm.valueChanges.subscribe({
          next: () => {
            this.voteRewardsChange = true;
          }
        })

        this.loadingRewards = false
      },
      error: () => {
        this.notifyService.notify("error", "Impossible de joindre l'api")
        this.loadingRewards = false
      }
    })
  }

  UpdateMonthRanking(){
    this.loadingMonth = true
    this.voteService.getMonthVotes(this.date,this.monthVotesPagined.pageSize,this.monthVotesPagined.pageNumber).subscribe({
      next: (ranking) => {
        this.monthVotesPagined = ranking
        console.log(this.monthVotesPagined.items)
        this.loadingMonth = false

      },
      error: () => {
        this.notifyService.notify("error", "Impossible de joindre l'api")
        this.loadingMonth = false
      }
    })
  }

  UpdateTotalRanking(){
    this.loadingTotal = true
    this.voteService.getTotalVotes(this.totalVotesPagined.pageSize,this.totalVotesPagined.pageNumber).subscribe({
      next: (ranking) => {
        this.totalVotesPagined = ranking
        this.loadingTotal = false

      },
      error: () => {
        this.notifyService.notify("error", "Impossible de joindre l'api")
        this.loadingTotal = false
      }    
    })
  }

  MoveToPage(pageNumber : number, pageSize : number, tab : 'month' | 'total'){
    if(tab == 'month'){
      this.monthVotesPagined.pageNumber = pageNumber
      this.UpdateMonthRanking()
    }
    else{
      this.totalVotesPagined.pageNumber = pageNumber
      this.UpdateTotalRanking()
    }
  }

  ChangeMonth(type : 'previous' | 'next'){
    if(type == 'previous'){
      this.date.setMonth(this.date.getMonth() - 1)
    }
    else{
      this.date.setMonth(this.date.getMonth() + 1)
    }
    this.UpdateMonthRanking();
  }

  AddLine(position : number){
    console.log(position)

    for(var i = this.voteRewardsControlName.length; i >= position; i--){
      var value = this.voteRewardsForm.controls[`position${i}`].value;
      this.voteRewardsForm.removeControl(`position${i}`)
      this.voteRewardsForm.addControl(`position${i + 1}`,new FormControl(value))
      this.voteRewardsControlName.splice(this.voteRewardsControlName.indexOf(`position${i}`), 1, `position${i + 1}`);
    }
    this.voteRewardsForm.addControl(`position${position}`, new FormControl(''))
    this.voteRewardsControlName.splice(position - 1,0,`position${position}`)
  }

  RemoveLine(number : number){
    this.loadingRewards = true
    this.voteRewardsControlName.splice(number - 1, 1)
    

    this.loadingRewards = false
  }

  SaveSettings(){
    this.loadingRewards = true
    var rewards : VoteReward[] = []

    this.voteRewardsControlName.forEach(x => {
      rewards.push(new VoteReward(Number.parseInt(x.replace("position","")), this.voteRewardsForm.controls[x].value))
    })
    console.log(rewards)

    this.voteService.updateVoteRewards(rewards).subscribe({
      next: (result) =>{
        this.loadingRewards = false
        this.notifyService.notify("success", "Modification sauvegardées")
      },
      error: () => {
        this.notifyService.notify("error", "Impossible de joindre l'api")
        this.loadingRewards = false
      }    
    })
  }

  getDateName(){
    return formatDate(this.date,'LLLL yyyy', 'fr').charAt(0).toUpperCase() + formatDate(this.date,'LLLL yyyy', 'fr').slice(1);
  }
}
