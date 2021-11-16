import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: ''
  };

  userSettings: UserSettings = {...this.originalUserSettings}; //use spread operator to make a copy of our original user settings
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionType();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
    
  }

  onSubmit(form: NgForm){
    console.log("ngSubmit:", form.valid);
    if (form.valid){
      this.postError = false;
      this.dataService.postUserSettingForm(this.userSettings).subscribe({
        next: result => console.log('success: ', result),
        error: err => this.onHttpError(err)
      });
    }
    else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors."
    }
  }
}
