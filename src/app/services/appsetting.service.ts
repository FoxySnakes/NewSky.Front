import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { AppSettingValues, AppSettingsPublicValues } from "../models/AppSettingModel";
import { BehaviorSubject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable({
    providedIn: 'root'
  })
export class AppSettingService implements OnInit{

    private appSettingsPublic$ = new BehaviorSubject<AppSettingsPublicValues>(new AppSettingsPublicValues);

    constructor(private apiService : ApiService) {}

    ngOnInit(): void {
        
    }

    fetchAppSettingsPublic(){
        this.apiService.get("appsetting/public").subscribe({
            next : (result) => {
                this.appSettingsPublic$.next(result)
            }
        })
    }

    getAppSettingsPublicObservable(){
        return this.appSettingsPublic$.asObservable();
    }

    getAppSettings(){
        return this.apiService.get("appsetting")
    }

    updateAppSettings(appSettings : AppSettingValues){
        return this.apiService.post("appsetting/update",appSettings)
    }
}