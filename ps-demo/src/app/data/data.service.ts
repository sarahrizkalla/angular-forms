import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }

  getSubscriptionType(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingForm(userSettings: UserSettings) : Observable<any> {
    return this.http.post('https://putsreq.com/NV0p0WGQ1FDNBRppqfpn', userSettings);
  }
}
