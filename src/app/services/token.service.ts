import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class TokenService{
    
    constructor(private apiService: ApiService) { }

    getTokenInvalid(){
        return this.apiService.get('token')
    }

    createTokenInvalid(tokenValue : string){
        return this.apiService.post('token/create/' + tokenValue, null)
    }

    deleteTokenInvalid(tokenValue : string){
        return this.apiService.post('token/delete/' + tokenValue, null)

    }
}