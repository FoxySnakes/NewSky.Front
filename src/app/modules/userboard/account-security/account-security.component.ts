import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'angular-notifier';
import { AccountManageDto } from 'src/app/models/AuthModel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent{
  loading = false

  dialogChangePasswordVisible = false
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required])
  })

  dialogDisableAccountVisible = false
  dialogDeleteAccountVisible = false
  accountForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  })

  constructor(private api : ApiService, 
              private notifService : NotifierService,
              private authService : AuthService,
              private router : Router
    ){}

  onHide(){
    this.changePasswordForm.reset()
    this.accountForm.reset()
  }

  onChangePassword(){
    if(!this.loading){
      this.loading = true
      this.api.post("auth/change-password", {oldPassword : this.changePasswordForm.controls.oldPassword.value!,newPassword : this.changePasswordForm.controls.oldPassword.value!}).subscribe({
        next: (result : AccountManageDto) => {
          this.loading = false
          if(result.success)
            this.notifService.notify('success', 'Mot de passe changé. Veuillez vous reconnectez')
          else
            this.notifService.notify('error', result.error)
        },
        error: () => this.loading = false
      })
    }
  }

  onDisableAccount(){
    if(!this.loading){
      this.loading = true
      this.api.post("auth/disable-account", {oldPassword : this.accountForm.controls.password.value!}).subscribe({
        next: (result : AccountManageDto) => {
          this.loading = false
          console.log(result)
          if(result.success){
            this.notifService.notify('success', 'Compte désativé')
            this.authService.logout()
          }
          else
            this.notifService.notify('error', result.error)
        },
        error: () => this.loading = false
      })
    }
  }

  onDeleteAccount(){
    if(!this.loading){
      this.loading = true
      this.api.post("auth/delete-account", {oldPassword : this.accountForm.controls.password.value!}).subscribe({
        next: (result : AccountManageDto) => {
          this.loading = false
          if(result.success){
            this.notifService.notify('success', 'Compte supprimé')
            this.authService.logout()
          }        
          else
            this.notifService.notify('error', result.error)
        },
        error: () => this.loading = false
      })
    }
  }
}
