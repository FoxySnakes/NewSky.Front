import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userBodySkinUrl! : string 

  changeEmailForm = new FormGroup({
    newEmail : new FormControl('', [Validators.required])
  })
  dialogChangeEmailVisible = false

  loading = false

  form = new FormGroup({    
    username : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
  })


  constructor(private userSevice : UserService){

  }

  ngOnInit(): void {
    this.form.disable()
    this.userSevice.getCurrentUserObservable().subscribe({
      next: (user) => {
        console.log(user)
        if(user != null){
          this.form.controls.username.setValue(user.userName)
          this.form.controls.email.setValue(user.email)
          this.userBodySkinUrl = this.userSevice.getUserBodySkinUrl(75)
        }
      }
    })
  }

  onChangeEmail(){
    this.userSevice.updateUserEmail(this.changeEmailForm.controls.newEmail.value!).subscribe({
      next: (success) => {
        if(success){
          this.dialogChangeEmailVisible = false
          this.changeEmailForm.reset()
        }
      }
    })
  }
}
