import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RegisterDto } from 'src/app/models/AuthModel';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  newUsername! : string
  error! : string | null
  callbackUrl :string | undefined = '/'
  globalForm = new FormGroup({
    firstname : new FormControl('', [Validators.required]),
    lastname : new FormControl('', [Validators.required]),
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    email : new FormControl('', [Validators.required, Validators.pattern("^.+@.+\..+$")]),
  })
  globalFormValid = false;

  additionalForm = new FormGroup({
    birthday : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    zipcode : new FormControl('', [Validators.required, Validators.pattern("^[0-9]{5}$")]),
    city : new FormControl('', [Validators.required]),
    country : new FormControl('', [Validators.required]),
    phonenumber : new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
  })

  additionalFormValid = false;

  usernameValidation = new FormGroup({
    newUsername : new FormControl(this.newUsername,Validators.required)
  })
  changingUserName = false

  newUserSkinUrl! : string | undefined

  constructor(private authService : AuthService,
              private notifService : NotifierService,
              private router : Router){
                if(this.router.getCurrentNavigation()?.previousNavigation?.finalUrl)
                this.callbackUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString()
              }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate([this.callbackUrl])
    }
    else{
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
  }

  validateGlobalForm(){
    this.error = null;
    if(this.globalForm.valid){
      this.globalFormValid = true
      this.newUsername = this.globalForm.value.username?? ""
    }
    else{
      this.error = "Tout les champs ne sont pas remplis"
    }
  }

  validateAddtionalForm(){
    this.error = null;
    if(this.additionalForm.valid){
      this.additionalFormValid = true
      this.usernameValidation.controls.newUsername.reset()
    }
    else{
      this.error = "Tout les champs ne sont pas remplis"
    }
  }

  changeUsername(){
    this.newUsername = this.usernameValidation.controls.newUsername.value?? ''
    this.changingUserName = false
  }

  register() : void{
    this.error = null;
   
       const registerData: RegisterDto = {
         FirstName: this.globalForm.value.firstname?.toString() ?? '',
         LastName: this.globalForm.value.lastname?.toString() ?? '',
         UserName: this.globalForm.value.username?.toString() ?? '',
         Password: this.globalForm.value.password?.toString() ?? '',
         Email: this.globalForm.value.email?.toString() ?? '',
         Birthday: new Date(this.additionalForm.value.birthday?.toString() ?? ''),
         Address: this.additionalForm.value.address?.toString() ?? '',
         ZipCode: this.additionalForm.value.zipcode?.toString() ?? '',
         City: this.additionalForm.value.city?.toString() ?? '',
         Country: this.additionalForm.value.country?.toString() ?? '',
         PhoneNumber: this.additionalForm.value.phonenumber?.toString() ?? ''
       };
       console.log(registerData)
      this.error = this.authService.register(registerData, this.callbackUrl as string)
  }
}