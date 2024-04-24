import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-token-invalid',
  templateUrl: './token-invalid.component.html',
  styleUrls: ['./token-invalid.component.scss']
})
export class TokenInvalidComponent implements OnInit{

  constructor(private tokenService : TokenService,
              private notifyService : NotifierService
  ){}

  tokenForm = new FormGroup({
    tokenValue : new FormControl('')
  })

  tokenList : string[] = []

  loading = false;

  ngOnInit(): void {
    this.tokenService.getTokenInvalid().subscribe({
      next: (result) => {
        this.tokenList = result;
      }
    })
  }

  CreateToken(){
    if(this.tokenForm.controls.tokenValue.value != null && this.tokenForm.controls.tokenValue.value != ""){
      this.tokenService.createTokenInvalid(this.tokenForm.controls.tokenValue.value).subscribe({
        next : (result) => {
          if(result.success){
            this.notifyService.notify("success", "Token invalidé avec succès")
          }
          else{
            this.notifyService.notify("error", result.errors[0])
          }
        }
      })
    }
  }

  DeleletToken(tokenValue : string){
    this.tokenService.deleteTokenInvalid(tokenValue).subscribe({
      next : (result) => {
        if(result.success){
          this.notifyService.notify("success", "Ce token est de nouveau valide")
        }
        else{
          this.notifyService.notify("error", result.errors[0])
        }
      }
    })
  }

}
