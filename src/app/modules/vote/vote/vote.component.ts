import { Component, OnInit } from '@angular/core';
import { RankingResult, UserVoteNumber, VoteReward, VoteStatusDto, VoteWebSite } from 'src/app/models/VoteModel';
import { interval, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/UserModel';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { AppSettingService } from 'src/app/services/appsetting.service';
import { AppSettingsPublicValues } from 'src/app/models/AppSettingModel';

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

  username : string | null = null
  usernameForm = new FormGroup({
    username : new FormControl<string | null>(null)
  })

  ranking = new RankingResult()
  rankingFilterType = "month"
  userRanking = new UserVoteNumber()

  rewards: VoteReward[] = []

  appSettingsPublicValues : AppSettingsPublicValues = new AppSettingsPublicValues;

  constructor(private apiService: ApiService,
    private userService: UserService,
    private notifService: NotifierService,
    private authService: AuthService,
    private voteService: VoteService,
    private appSettingsService : AppSettingService) { }

  ngOnInit() {
    this.userService.getCurrentUserObservable().subscribe({
      next: (user) => {
        this.username = user == null ? null : user.userName
        this.UpdatePlayerData()
      }
    })

    this.voteService.getServerRanking().subscribe({
      next: (response) => {
        this.ranking = response;
      },
      error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    })

    this.voteService.getVoteRewards().subscribe({
      next: (rewards) => {
        this.ChangeRewardsToDisplay(rewards)
      },
      error: () => this.notifService.notify('error', "Impossible de joindre l'API")
    })

    this.appSettingsService.getAppSettingsPublicObservable().subscribe({
      next: (result) => {
        this.appSettingsPublicValues = result;
      }
    })

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

  UpdatePlayerData(){

    if(this.username != null){
      this.voteService.updateUserRanking(this.username).subscribe({
        next: (userRanking) => this.userRanking = userRanking
      })
  
      this.voteService.updateUserVoteStatus(this.username).subscribe({
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
    }
  }

  TryVote(voteWebSite: number) {
    if (this.loading == false) {
      this.loading = true
      this.voteService.tryVote(voteWebSite,this.username!).subscribe({
        next: (result: boolean) => {

          if (result == true) {
            if (voteWebSite == VoteWebSite.Serveur_Prive)
              this.vote1Status.timeLeft = this.FormatTimeLeft("01:30:00")
            if (voteWebSite == VoteWebSite.ServeursMinecraft)
              this.vote2Status.timeLeft = this.FormatTimeLeft("24:00:00")
            if (voteWebSite == VoteWebSite.Top_Serveurs)
              this.vote3Status.timeLeft = this.FormatTimeLeft("02:00:00")

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
  }

  ChangeRewardsToDisplay(rewards: VoteReward[]) {
    let newRewardArray: VoteReward[] = []
    var position = 1

    while (position < rewards.length) {
      var startPosition = position
      var currentReward = rewards[position - 1].reward

      while (currentReward == rewards[position].reward) {
        position++
        if (position == rewards.length)
          break;
      }

      newRewardArray.push({
        position: startPosition == position ? `${startPosition}` : `${startPosition}-${position}`,
        reward: rewards[position - 1].reward
      })
      position++
    }
    this.rewards = newRewardArray
  }

  SetUserName(){
    this.username = this.usernameForm.controls.username.value
    this.UpdatePlayerData()
  }

  private FormatTimeLeft(timeLeft: string): number {
    var values = timeLeft.split(':')
    var numbers: number[] = values.map(Number)
    return (numbers[0] * 3600 + numbers[1] * 60 + numbers[2])
  }
}
