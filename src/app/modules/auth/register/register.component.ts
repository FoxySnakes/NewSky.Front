import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RegisterDto } from 'src/app/models/AuthModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading = false
  error!: string | null
  callbackUrl: string | undefined = '/'
  globalForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^.+@.+\..+$")]),
    rememberMe: new FormControl(false)
  })
  globalFormValid = false;
  changingUserName = false

  newUserSkinUrl!: string | undefined

  constructor(private authService: AuthService,
    private router: Router) {
    if (this.router.getCurrentNavigation()?.previousNavigation?.finalUrl)
      this.callbackUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.callbackUrl == "/login " || this.callbackUrl == "/register") {
        this.router.navigate(["/"])
      }
      else {
        this.router.navigate([this.callbackUrl])
      }
    }
  }

  validateGlobalForm() {
    this.error = null;
    if (this.globalForm.valid) {
      this.globalFormValid = true
      this.newUserSkinUrl = `https://minotar.net/armor/body/${this.globalForm.controls.username.value}/150.png`
    }
    else {
      this.error = "Tout les champs ne sont pas remplis"
    }
  }

  changeUsername() {
    this.changingUserName = false
    this.newUserSkinUrl = `https://minotar.net/armor/body/${this.globalForm.controls.username.value}/150.png`
  }

  register() {
    this.error = null;
    const registerData: RegisterDto = {
      UserName: this.globalForm.value.username?.toString() ?? '',
      Password: this.globalForm.value.password?.toString() ?? '',
      Email: this.globalForm.value.email?.toString() ?? '',
      RememberMe: this.globalForm.value.rememberMe ?? false
    };
    this.authService.register(registerData, this.callbackUrl as string)
  }
}