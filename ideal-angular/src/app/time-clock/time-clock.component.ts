import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent {
  public now: Date = new Date();
  toggle: boolean = false;

  clockInDisabled = false;
  disabledDuration = 60; // minutes

  constructor(private snackBar: MatSnackBar) {
    setInterval(() => {
      this.now = new Date();
    }, 60);
  }
  doToggle(): void {
    this.toggle = !this.toggle;
    // Do some other stuff needed
  }

  setTime() {
    const durationInSeconds = 5;
    const timeIn = formatDate(this.now, 'h:mm a', 'en-001');
    this.snackBar.open('Your time in is: ' + timeIn, '', {
      duration: durationInSeconds * 1000,
    });
    this.clockInDisabled = true;
    setTimeout(() => {
      this.clockInDisabled = false;
    }, this.disabledDuration * 60 * 1000);
  }

}
