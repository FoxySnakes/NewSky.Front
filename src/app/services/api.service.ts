import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Filter } from '../models/FilterModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get(endpoints: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`)
  }

  getPaged(endpoints: string, pageSize : number, pageNumber : number, filter : Filter) {
    let params = new HttpParams()
    .set('pageNumber', pageNumber.toString())
    .set('pageSize', pageSize.toString())
    .set("filter",filter.name)
    .set("direction", filter.direction)

    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`,  { params });
  }

  post(endpoints: string, data: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/${endpoints}`,data)
  }

}
