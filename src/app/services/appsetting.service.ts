import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { AppSettingValues } from "../models/AppSettingModel";
import { BehaviorSubject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable({
    providedIn: 'root'
  })
export class AppSettingService implements OnInit{

    constructor(private apiService : ApiService) {}

    ngOnInit(): void {
        
    }

    getAppSettings(onlyPublic : boolean = false){
        if(onlyPublic)
            return this.apiService.get("appsetting/public")

        return this.apiService.get("appsetting")
    }

    updateAppSettings(appSettings : AppSettingValues){
        return this.apiService.post("appsetting/update",appSettings)
    }
}