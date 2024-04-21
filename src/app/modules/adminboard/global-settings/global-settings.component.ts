import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AppSettingValues } from 'src/app/models/AppSettingModel';
import { AppSettingService } from 'src/app/services/appsetting.service';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {

  loading = false
  isLoaded = false

  hasChanges = false

  appSettingsForm : FormGroup = new FormGroup({})

  constructor(private appSettingService : AppSettingService,
              private notifyService : NotifierService) {
    
  }

  ngOnInit(): void {
    this.appSettingService.getAppSettings().subscribe({
      next: (appSettings) => {
        for(const key in appSettings){
          var value = appSettings[key]
          this.appSettingsForm.addControl(key, new FormControl(value))
        }
        this.isLoaded = true
        this.loading = false

        this.appSettingsForm.valueChanges.subscribe({
          next: () => this.hasChanges = true
        })
      },
      error: () =>  this.loading = false
    })
  }

  UpdateSettings(){
    var appSettings = new AppSettingValues
    for(const key in appSettings){
      var value = this.appSettingsForm.controls[key].value
      appSettings[key] = value
    }

    this.appSettingService.updateAppSettings(appSettings).subscribe({
      next: (result) => {
        if(result){
          this.notifyService.notify("success", "Modifications sauvegardées")
          this.hasChanges = false
        }
        else{
          this.notifyService.notify("error", "Erreur dans les modifications")
        }
        this.loading = false
      },
      error: () => {
        this.loading = false
        this.notifyService.notify("error", "Impossible de joindre l'API")
      }
    })
  }
}
