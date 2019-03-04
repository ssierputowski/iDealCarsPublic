import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private http: HttpClient) { }

  public sendSubscriptionToServer(subscription: PushSubscription) {
    return this.http.post(BACKEND_URL + '/subscription', subscription);
  }
}
