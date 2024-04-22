import { Component, OnInit } from '@angular/core';
import { AppSettingsPublicValues } from 'src/app/models/AppSettingModel';
import { AppSettingService } from 'src/app/services/appsetting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  appSettingsPublicValues : AppSettingsPublicValues = new AppSettingsPublicValues;

  constructor(private appSettingsService : AppSettingService) {
  }

  ngOnInit(): void {
    this.appSettingsService.getAppSettingsPublicObservable().subscribe({
      next: (result) => {
        this.appSettingsPublicValues = result;
        console.log(this.appSettingsPublicValues)
      }
    })
  }

}
