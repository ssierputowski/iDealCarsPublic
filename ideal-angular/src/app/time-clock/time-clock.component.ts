import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-time-clock',
  templateUrl: './time-clock.component.html',
  styleUrls: ['./time-clock.component.css']
})
export class TimeClockComponent implements OnInit {
  public now: Date = new Date();

  constructor(private userService: UserService) {
    setInterval(() => {
      this.now = new Date();
    }, 60);
  }

  employeeId: string;
  weekOf: any;
  sunday: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;

  ngOnInit() {
    this.employeeId = localStorage.getItem('employeeId');
    this.userService.getUserSchedule(this.employeeId)
      .subscribe((data) => {
        this.weekOf = data.schedule.weekOf;
        this.sunday = data.schedule.sunday;
        this.monday = data.schedule.monday;
        this.tuesday = data.schedule.tuesday;
        this.wednesday = data.schedule.wednesday;
        this.thursday = data.schedule.thursday;
        this.friday = data.schedule.friday;
        this.saturday = data.schedule.saturday;
        console.log(this.weekOf);
      });
  }

  setTime() {
    const timeIn = formatDate(this.now, 'h:mm', 'en-001');
    console.log(timeIn);
  }

}
