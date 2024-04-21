import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Filter } from '../models/FilterModel';
import { Role } from '../models/RoleModel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService : ApiService) { }

  getRoles(){
    return this.apiService.get("role")
  }

  getRolesPaged(pageSize: number, pageNumber: number, filter : Filter, search: string) {
    return this.apiService.getPaged('role/pagined', pageSize, pageNumber, filter, search)
  }

  createRole(role : Role){
    return this.apiService.post('role/create',role)
  }

  updateRole(role : Role){
    return this.apiService.post('role/update',role)
  }

  deleteRole(roleName : string){
    return this.apiService.post(`role/delete?rn=${roleName}`, roleName)
  }
}
