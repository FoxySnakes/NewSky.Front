import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { LoginDto } from 'src/app/models/AuthModel';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  error! : string | null
  callbackUrl :string | undefined = '/'
  form = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false)
  })

  constructor(private authService : AuthService,
              private notifService : NotifierService,
              private router : Router){
                if(this.router.getCurrentNavigation()?.previousNavigation?.finalUrl)
                this.callbackUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString()
              }

  ngOnInit(): void {
    var inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', (event : any) =>{
        if(event.target.value != null && !event.target.classList.contains("not-empty")){
          event.target.classList.add("not-empty")
        }
        if((event.target.value === null || event.target.value == "") && event.target.classList.contains("not-empty")){
          event.target.classList.remove("not-empty")
        }
      })
    }
  }

  login() : void{
    var formData = this.form.value;
    this.error = null;

    console.log("ok")
    if(formData.username && formData.password && (formData.rememberMe == true || formData.rememberMe == false)){
      const loginData: LoginDto = {
        UserName: formData.username,
        Password: formData.password,
        RememberMe: formData.rememberMe
      };

      this.authService.login(loginData).subscribe({
        next : (response) => {
          if(response.isSuccess){
            console.log("success")
            this.notifService.notify('success','Connexion réussie')
            
          }
          else{
            this.error = "Nom d'utilisateur ou mot de passe invalide"
          }
        },
        error : (error) => this.notifService.notify('error',"Erreur lors de la requête")
        
      })
    }
  }
}
