import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserPrivateInfo } from 'src/app/models/UserModel';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username : string | undefined
  userBodySkinUrl! : string 

  form = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    userName : new FormControl('',[Validators.required]),
    zipCode : new FormControl('',[Validators.required]),
    city : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    country : new FormControl('',[Validators.required]),
  })

  oldPrivateInfo!: UserPrivateInfo;

  constructor(private userSevice : UserService,
              private apiService : ApiService,
              private notifService : NotifierService){

  }

  ngOnInit(): void {
    this.form.disable()
    this.userSevice.getCurrentUserObservable().subscribe({
      next: (user) => {
        this.username = user?.userName
        this.userBodySkinUrl = this.userSevice.getUserBodySkinUrl(75)
      }
    })
    this.apiService.get('user/personnal-information').subscribe({
      next: (userPrivateInfo : UserPrivateInfo) => {
        this.oldPrivateInfo = userPrivateInfo
        this.form.patchValue(this.oldPrivateInfo)
      }
    })
  }

  onSubmit(){
    var newPrivateInfo : UserPrivateInfo = {
      firstName : this.form.controls.firstName.value!,
      lastName : this.form.controls.lastName.value!,
      email : this.form.controls.email.value!,
      userName : this.oldPrivateInfo.userName,
      zipCode : this.form.controls.zipCode.value!,
      city : this.form.controls.city.value!,
      address : this.form.controls.address.value!,
      country : this.form.controls.country.value!,
    }


    this.apiService.post('user/update', newPrivateInfo).subscribe({
      next: (result) => {
        if(result.succeeded){
          this.oldPrivateInfo = newPrivateInfo;
          this.notifService.notify("success","Modification apportée avec succès !")
        }
        else{
          this.notifService.notify("error", "Erreur dans la modification de vos informations")
        }
      }
    })

    this.form.disable()
    this.form.markAsPristine()
  }

  onReset(){
    this.form.reset(this.oldPrivateInfo)
    this.form.disable()
  }

  onEnableEdit(){
    this.form.enable()
  }
}
