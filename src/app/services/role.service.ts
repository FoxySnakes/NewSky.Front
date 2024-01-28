import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService : ApiService) { }

  getRoles(){
    return this.apiService.get("role")
  }
}
