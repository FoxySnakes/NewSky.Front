import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Filter } from '../models/FilterModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get(endpoints: string, params : HttpParams | null = null) {
    if(params != null){
      return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`, {params})
    }
    else{
      return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`)
    }
  }

  getPaged(endpoints: string, pageSize : number, pageNumber : number, filter : Filter | null, search : string | null) {
    let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    if(search != null){
      params = params.set('search', search)
    }

    if(filter != null){
      params = params.set("filter",filter.name)
      .set("direction", filter.direction)
    }
    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`,  { params });
  }

  post(endpoints: string, data: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/${endpoints}`,data)
  }

  deleteAll(endpoints: string){
    return this.httpClient.delete<any>(`${environment.apiUrl}/${endpoints}`)
  }

}
