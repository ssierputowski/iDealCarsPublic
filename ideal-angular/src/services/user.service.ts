import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Schedule } from '../models/schedule.model';

import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: any[] = [];
  private usersUpdated = new Subject<{users: any[]}>();

  constructor(
    private http: HttpClient,
  ) {}

  getUsers() {
    this.http.get<{message: string, users: any}>(
      BACKEND_URL
    )
    .pipe(map((userData) => {
      return {
        users: userData.users.map(user => {
          return {
            employeeId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            jobRole: user.jobRole
          };
        })
      };
    }))
    .subscribe((transformedUserData) => {
      this.users = transformedUserData.users;
      this.usersUpdated.next({users: [...this.users]});
    });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<User>(BACKEND_URL + '/' + id);
  }

  getUserSchedule(id: string) {
    return this.http.get(BACKEND_URL + '/schedule/' + id);
  }

  setUserSchedule(
    employeeId: string,
    weekOf: string,
    sunIn: string,
    sunOut: string,
    monIn: string,
    monOut: string,
    tueIn: string,
    tueOut: string,
    wedIn: string,
    wedOut: string,
    thuIn: string,
    thuOut: string,
    friIn: string,
    friOut: string,
    satIn: string,
    satOut: string
  ) {
    const scheduleData = {
      employeeId: employeeId,
      weekOf: weekOf,
      sunIn: sunIn,
      sunOut: sunOut,
      monIn: monIn,
      monOut: monOut,
      tueIn: tueIn,
      tueOut: tueOut,
      wedIn: wedIn,
      wedOut: wedOut,
      thuIn: thuIn,
      thuOut: thuOut,
      friIn: friIn,
      friOut: friOut,
      satIn: satIn,
      satOut: satOut
    };
    this.http.post<{message: string, schedule: Schedule}>(BACKEND_URL + '/schedule', scheduleData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateUserSchedule(
    employeeId: string,
    weekOf: string,
    sunIn: string,
    sunOut: string,
    monIn: string,
    monOut: string,
    tueIn: string,
    tueOut: string,
    wedIn: string,
    wedOut: string,
    thuIn: string,
    thuOut: string,
    friIn: string,
    friOut: string,
    satIn: string,
    satOut: string
  ) {
    const scheduleData = {
      employeeId: employeeId,
      weekOf: weekOf,
      sunIn: sunIn,
      sunOut: sunOut,
      monIn: monIn,
      monOut: monOut,
      tueIn: tueIn,
      tueOut: tueOut,
      wedIn: wedIn,
      wedOut: wedOut,
      thuIn: thuIn,
      thuOut: thuOut,
      friIn: friIn,
      friOut: friOut,
      satIn: satIn,
      satOut: satOut
    };
    this.http.put<{message: string}>(BACKEND_URL + '/schedule', scheduleData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
