import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {
  // public now = Math.abs(new Date().getHours() - 12) + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      // this.now = Math.abs(new Date().getHours() - 12) + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
      this.now = new Date();
    }, 1);
  }

  ngOnInit() {
  }

}
