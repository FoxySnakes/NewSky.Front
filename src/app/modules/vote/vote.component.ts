import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RankingResult, UserVoteNumber, VoteReward, VoteStatusDto, VoteWebSite } from 'src/app/models/VoteModel';
import { interval, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  vote1Status = new VoteStatusDto;
  vote2Status = new VoteStatusDto;
  vote3Status = new VoteStatusDto;

  loading = false;
  result!: string
  private timerSubscription!: Subscription

  username!: string | null

  ranking = new RankingResult()
  rankingFilterType = "month"
  userRanking = new UserVoteNumber()

  rewards : VoteReward[] = []

  constructor(private api: ApiService,
    private userService: UserService,
    private notifService: NotifierService) { }

  ngOnInit() {
    
    this.api.get(`vote/status`).subscribe({
      next: (statusList: [any]) => {
        var voteStatus1 = statusList.find(x => x.voteWebSite == VoteWebSite.Serveur_Prive)
        this.vote1Status.timeLeft = this.FormatTimeLeft(voteStatus1.timeLeft)

        var voteStatus2 = statusList.find(x => x.voteWebSite == VoteWebSite.ServeursMinecraft)
        this.vote2Status.timeLeft = this.FormatTimeLeft(voteStatus2.timeLeft)

        var voteStatus3 = statusList.find(x => x.voteWebSite == VoteWebSite.Top_Serveurs)
        this.vote3Status.timeLeft = this.FormatTimeLeft(voteStatus3.timeLeft)
      },
      error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    })

    this.api.get("vote/ranking?limit=10").subscribe({
      next: (response) => {
        this.ranking = response;
      },
      error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    })

    this.api.get("vote/rewards").subscribe({
      next: (rewards) => {
        this.ChangeRewardsToDisplay(rewards)
      },
      error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    })

    // this.userService.getCurrentUserObservable().subscribe({
    //   next: (user) => {
    //     this.username = user?.username ?? null
    //     console.log(this.username)
    //     if (this.username != null) {
    //       this.api.get(`vote/ranking/${this.username}`).subscribe({
    //         next: (userRanking) => {
    //           this.userRanking = userRanking
    //         },
    //         error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    //       })
    //     }
    //   }
    // })

    this.timerSubscription = interval(1000).subscribe({
      next: () => {
        if (this.vote1Status.timeLeft > 0)
          this.vote1Status.timeLeft--
        if (this.vote2Status.timeLeft > 0)
          this.vote2Status.timeLeft--
        if (this.vote3Status.timeLeft > 0)
          this.vote3Status.timeLeft--
      }
    })

  }

  private FormatTimeLeft(timeLeft: string): number {
    var values = timeLeft.split(':')
    var numbers: number[] = values.map(Number)
    return (numbers[0] * 3600 + numbers[1] * 60 + numbers[2])
  }

  TryVote(voteWebSite: number) {
    this.loading = true
    this.api.get(`vote/${voteWebSite}`).subscribe({
      next: (result: boolean) => {
        
        if (result == true) {
          this.SyncVoteStatus(voteWebSite)
          this.notifService.notify('success', "Vote réussi, vos récompense vous attendent en jeu")
        }
        else {
          this.notifService.notify('warning', "Temps d'attente écoulé, Veuillez réessayer")
        }
        this.loading = false
      },
      error: () => {
        this.notifService.notify("error", "Impossible de joindre l'API")
        this.loading = false
      }
    })
  }

  SyncVoteStatus(voteWebSite: number) {
    this.api.get(`vote/status/${voteWebSite}`).subscribe({
      next: (result: any) => {
        if (result.voteWebSite == VoteWebSite.Serveur_Prive)
          this.vote1Status.timeLeft = this.FormatTimeLeft(result.timeLeft)
        if (result.voteWebSite == VoteWebSite.ServeursMinecraft)
          this.vote2Status.timeLeft = this.FormatTimeLeft(result.timeLeft)
        if (result.voteWebSite == VoteWebSite.Top_Serveurs)
          this.vote3Status.timeLeft = this.FormatTimeLeft(result.timeLeft)
      },
      error: () => {
        this.notifService.notify("error", "Impossible de joindre l'API")
      }
    })
  }

  ChangeFilter(type: string) {
    this.rankingFilterType = type
  }

  ChangeRewardsToDisplay(rewards: VoteReward[]) {
    let newRewardArray: VoteReward[] = []
    var position = 1

    while (position < rewards.length) {
      var startPosition = position
      var currentReward = rewards[position - 1].reward

      while (currentReward == rewards[position].reward) {
        position++
        if(position == rewards.length)
          break;
      }

      newRewardArray.push({
        position : startPosition == position ? `${startPosition}` : `${startPosition }-${position}`,
        reward : rewards[position - 1].reward
      })
      position++
    }
    this.rewards = newRewardArray
  }
}
