import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.sub = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
