import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get(endpoints: string) {
    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`);
  }

  getPaged(endpoints: string, pageSize : number, pageNumber : number) {
    return this.httpClient.get<any>(`${environment.apiUrl}/${endpoints}`);
  }

  post(endpoints: string, data: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/${endpoints}`,data)
  }
}
