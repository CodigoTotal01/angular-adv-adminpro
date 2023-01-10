import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
})
export class AcountSettingsComponent implements OnInit {
 
  public linkTheme = document.querySelector("#theme");
  
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.settingsService.changeTheme(theme);
  }
}
