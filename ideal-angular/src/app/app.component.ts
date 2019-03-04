import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { AuthService } from './auth/auth.service';
import { NotificationService } from 'src/services/notification.service';

import { environment } from '../environments/environment';

const VAPID_PUBLIC = environment.vapidPublicKey;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    swPush: SwPush,
    pushService: NotificationService
  ) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC
        })
        .then(subscription => {
          // send subscription to server
          pushService.sendSubscriptionToServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}

