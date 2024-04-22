import { Component, OnInit } from '@angular/core';
import { AppSettingsPublicValues } from 'src/app/models/AppSettingModel';
import { AppSettingService } from 'src/app/services/appsetting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  appSettingsPublicValues : AppSettingsPublicValues = new AppSettingsPublicValues;

  constructor(private appSettingsService : AppSettingService){

  }
  ngOnInit(): void {
    this.appSettingsService.getAppSettingsPublicObservable().subscribe({
      next: (result) => {
        this.appSettingsPublicValues = result;
      }
    })
  }
}
